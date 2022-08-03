<template>
  <AlertView :arrayAlert="arrayAlert" v-on:changeShow="closeAlert($event)" />
  <div id="PersonsTable">
    <TableView
      :tableProps="tableProps"
      :allItems="allPersons"
      @deleteItem="deletePerson"
      @updateItem="updatePerson"
    />
    <div class="bottom-table">
      <div class="table-person-add">
        <button
          class="btn-form blue"
          @click="addNewPerson()"
          :data-title="getLocalizationtxt.personPage.create"
        >
          {{ getLocalizationtxt.personPage.add_person }}
        </button>
      </div>
    </div>
  </div>
  <PopapView :PopapProps="PopapProps" v-on:closePopap="closePopap">
    <template #headerPopap>
      <div class="header">
        <h3>{{ popapTitle }}</h3>
      </div>
    </template>
    <template #bodyPopap
      ><div class="body">
        <div
          v-if="popapType === 'update' || popapType === 'create'"
          class="form-input"
          @keydown.enter="saveForm"
        >
          <div class="row-input">
            <input
              type="text"
              autofocus
              v-model="checkedPersonInfo.name"
              @input="handlingFormInput('string', 'name', 'errorName', 2)"
              :placeholder="getLocalizationtxt.userPage.name"
              @paste="$event.preventDefault()"
              class="input-form"
              ref="inputName"
              maxlength="16"
            />
            <p :class="checkedPersonInfo.errorName" class="error-input name">
              {{ getLocalizationtxt.userPage.nameError }}
            </p>
          </div>
          <div class="row-input">
            <input
              type="text"
              v-model="checkedPersonInfo.surname"
              @input="handlingFormInput('string', 'surname', 'errorSurname', 2)"
              :placeholder="getLocalizationtxt.userPage.surname"
              @paste="$event.preventDefault()"
              class="input-form"
              ref="inputSurname"
              maxlength="16"
            />
            <p
              :class="checkedPersonInfo.errorSurname"
              class="error-input surname"
            >
              {{ getLocalizationtxt.userPage.surnameError }}
            </p>
          </div>
          <div class="row-input mb-0">
            <input
              type="text"
              v-model="checkedPersonInfo.phone"
              @input="handlingFormInput('number', 'phone', 'errorPhone', 6)"
              maxlength="16"
              :placeholder="getLocalizationtxt.userPage.phone"
              @paste="$event.preventDefault()"
              class="input-form"
              ref="inputPhone"
            />
            <p :class="checkedPersonInfo.errorPhone" class="error-input phone">
              {{ getLocalizationtxt.userPage.phoneError }}
            </p>
          </div>
        </div>
        <div v-else-if="popapType === 'delete'">
          <p>{{ getLocalizationtxt.personPage.delete_text_confirm }}</p>
        </div>
      </div>
    </template>
    <template #footerPopap>
      <div class="footer">
        <button class="btn-form blue" @click="saveForm" ref="saveForm"></button>
        <button class="btn-form grey ml-1" @click="closePopap">
          {{ getLocalizationtxt.personPage.close }}
        </button>
      </div>
    </template>
  </PopapView>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertView from "@/components/AlertView.vue";
import PopapView from "@/components/PopapView.vue";
import TableView from "@/components/Table/TableView.vue";
import Languages from "@/types/Localization/Language/Languages";
import Persons from "@/types/Person/Persons";
import { replaceValue, emptyValidation } from "@/plugins/Validation";

export default defineComponent({
  name: "PersonsTableView",
  components: { AlertView, TableView, PopapView },
  data() {
    return {
      sortButtons: {
        id: "down",
        name: "off",
        surname: "off",
        phone: "off",
      },
      popapTitle: "",
      popapType: "",
      PopapProps: {
        show: false,
      },
      tableProps: {
        header: [
          {
            name: "#",
            prop: "id",
            sort: true,
          },
          {
            name: "",
            prop: "name",
            sort: true,
          },
          {
            name: "",
            prop: "surname",
            sort: true,
          },
          {
            name: "",
            prop: "phone",
            sort: true,
          },
          {
            name: "",
            prop: "",
            sort: false,
          },
        ],
        footer: {
          tableTitleKey: "personPage",
          tableTitleValue: "title_table",
          search: true,
          updateDelete: true,
          show: true,
          updatePagination: false,
        },
      },
      checkedPersonInfo: {
        checkedID: 0,
        name: "",
        errorName: "",
        surname: "",
        errorSurname: "",
        phone: "",
        errorPhone: "",
      },
      arrayAlert: {
        msg: "",
        msgType: "",
        show: false,
      },
    };
  },
  mounted() {
    this.checkTableItem();
  },
  computed: {
    getLocalizationtxt(): Languages {
      return this.$store.getters["localizationInfo"];
    },
    allPersons(): Persons[] {
      return this.$store.getters["allPersons"];
    },
  },
  methods: {
    handlingFormInput(
      typeValidation: string,
      vModel: string,
      errorName: string,
      minLength: number
    ): void {
      if (typeValidation === "string" || typeValidation === "number") {
        if (typeValidation === "string") {
          this.checkedPersonInfo.name = replaceValue(
            this.checkedPersonInfo.name,
            typeValidation
          ) as string;
          this.checkedPersonInfo.errorName = emptyValidation(
            this.checkedPersonInfo.name,
            minLength
          )
            ? "true"
            : "false";
        }
        if (typeValidation === "string" && vModel === "surname") {
          this.checkedPersonInfo.surname = replaceValue(
            this.checkedPersonInfo.surname,
            typeValidation
          ) as string;
          this.checkedPersonInfo.errorSurname = emptyValidation(
            this.checkedPersonInfo.surname,
            minLength
          )
            ? "true"
            : "false";
        }
        if (typeValidation === "number") {
          this.checkedPersonInfo.phone = replaceValue(
            this.checkedPersonInfo.phone,
            typeValidation
          ) as string;
          this.checkedPersonInfo.errorPhone = emptyValidation(
            this.checkedPersonInfo.phone,
            minLength
          )
            ? "true"
            : "false";
        }
      }
    },
    checkTableItem(): void {
      this.tableProps.header[1].name = this.getLocalizationtxt.userPage.name;
      this.tableProps.header[2].name = this.getLocalizationtxt.userPage.surname;
      this.tableProps.header[3].name = this.getLocalizationtxt.userPage.phone;
    },
    saveForm(): void {
      const saveType = this.popapType;
      if (saveType === "create" || saveType === "update") {
        if (
          this.checkedPersonInfo.errorName === "true" &&
          this.checkedPersonInfo.errorSurname === "true" &&
          this.checkedPersonInfo.errorPhone === "true"
        ) {
          if (saveType === "create") {
            let data: Persons = {
              id: "0",
              name: this.checkedPersonInfo.name,
              surname: this.checkedPersonInfo.surname,
              phone: this.checkedPersonInfo.phone,
            };
            this.$store.dispatch("A_ADD_NEW_PERSON", data);
            this.closePopap();
            this.arrayAlert.show = true;
            this.arrayAlert.msg =
              this.getLocalizationtxt.alertPage.success_added;
            this.arrayAlert.msgType = "success";
            this.tableProps.footer.updatePagination = true;
          } else if (saveType === "update") {
            let data = {
              id: this.checkedPersonInfo.checkedID,
              name: this.checkedPersonInfo.name,
              surname: this.checkedPersonInfo.surname,
              phone: this.checkedPersonInfo.phone,
            };
            this.$store.dispatch("A_UPDATE_PERSON", data);
            this.closePopap();
            this.arrayAlert.show = true;
            this.arrayAlert.msg =
              this.getLocalizationtxt.alertPage.success_updated;
            this.arrayAlert.msgType = "success";
          }
          this.emptyPopapForm();
        } else {
          this.arrayAlert.show = true;
          this.arrayAlert.msg = this.getLocalizationtxt.alertPage.empty_info;
          this.arrayAlert.msgType = "error";
        }
      } else if (saveType === "delete") {
        const send: string = this.checkedPersonInfo.checkedID.toString();
        this.$store.dispatch("A_DELETE_PERSON", send);
        this.arrayAlert.show = true;
        this.arrayAlert.msg = this.getLocalizationtxt.alertPage.success_deleted;
        this.arrayAlert.msgType = "success";
        this.closePopap();
      }
    },
    updatePerson(id: number): void {
      const target = this.$refs.saveForm as HTMLButtonElement;
      this.popapType = "update";
      this.popapTitle = target.innerHTML =
        this.getLocalizationtxt.personPage.update;
      target.classList.remove("danger");
      target.classList.add("blue");
      this.PopapProps.show = true;
      this.checkedPersonInfo.checkedID = id;
      const checkedPersonInfo: Persons =
        this.$store.getters["getPersonByID"](id);
      this.checkedPersonInfo.name = checkedPersonInfo.name;
      this.checkedPersonInfo.surname = checkedPersonInfo.surname;
      this.checkedPersonInfo.phone = checkedPersonInfo.phone;
      const self: any = this as object;
      this.removePopapErrors();
      setTimeout(function () {
        self.$refs.inputName.focus();
      }, 100);
    },
    deletePerson(id: number): void {
      const target = this.$refs.saveForm as HTMLButtonElement;
      this.popapTitle = target.innerHTML =
        this.getLocalizationtxt.personPage.delete;
      target.classList.remove("blue");
      target.classList.add("danger");
      this.popapType = "delete";
      this.checkedPersonInfo.checkedID = id;
      this.PopapProps.show = true;
    },
    addNewPerson(): void {
      const target = this.$refs.saveForm as HTMLButtonElement;
      this.emptyPopapForm();
      this.nullPopapErrors();
      target.innerHTML = this.getLocalizationtxt.personPage.create;
      target.classList.remove("danger");
      target.classList.add("blue");
      this.popapTitle = this.getLocalizationtxt.personPage.create;
      this.popapType = "create";
      this.PopapProps.show = true;
      let self: any = this as object;
      setTimeout(function () {
        self.$refs.inputName.focus();
      }, 100);
    },
    nullPopapErrors(): void {
      this.checkedPersonInfo.errorName = "";
      this.checkedPersonInfo.errorSurname = "";
      this.checkedPersonInfo.errorPhone = "";
    },
    emptyPopapForm(): void {
      this.checkedPersonInfo.name = "";
      this.checkedPersonInfo.surname = "";
      this.checkedPersonInfo.phone = "";
    },
    removePopapErrors(): void {
      this.checkedPersonInfo.errorName = "true";
      this.checkedPersonInfo.errorSurname = "true";
      this.checkedPersonInfo.errorPhone = "true";
    },
    closeAlert(): void {
      this.arrayAlert.show = false;
      this.arrayAlert.msg = "";
    },
    closePopap(): void {
      this.PopapProps.show = false;
    },
  },
});
</script>

<style lang="scss">
.bottom-table {
  width: 80%;
  margin: 10px auto 0px;
  display: flex;
  justify-content: end;
}

#Popap {
  .body {
    border: 1px solid #4a5156;
    border-left: none;
    border-right: none;
    padding: 20px 0;
    margin: 10px 0;

    .form-input {
      display: flex;
      flex-direction: column;
    }
  }

  .footer {
    display: flex;
    justify-content: end;
  }
}

@media only screen and (max-width: 425px) {
  .bottom-table {
    width: 95%;
  }
}
</style>
