<template>
  <div class="table">
    <div class="table-header">
      <h1 class="table-title">
        {{
          getLocalizationtxt[tableProps.footer.tableTitleKey][
            tableProps.footer.tableTitleValue
          ]
        }}
      </h1>
      <div class="table-settings">
        <div
          class="d-flex align-items-center justify-content-end table-setting-search"
          v-if="tableProps.footer.search"
        >
          <span class="title-setting mr-1"
            >{{ getLocalizationtxt.personPage.search }} :
          </span>
          <input
            type="search"
            class="input-form"
            v-model="searchKeyword"
            :placeholder="getLocalizationtxt.personPage.search"
          />
        </div>
      </div>
    </div>
    <div class="table-body">
      <div class="myTable">
        <div class="tr top">
          <div
            class="th d-flex align-items-center"
            v-for="(item, key) in tableProps.header"
            :key="key"
            :data-id="sortButtons[item.prop]"
            @click="
              item.sort ? sortByItem(sortButtons[item.prop], item.prop) : null
            "
          >
            <span v-if="item.prop === 'id'">#</span>
            <span v-else>{{ getLocalizationtxt.userPage[item.prop] }}</span>
            <div
              v-if="item.sort"
              class="content-sort-icon"
              :data-id="sortButtons[item.prop]"
            >
              <img
                src="@/assets/icons/arrow.svg"
                :class="[sortButtons[item.prop], 'arrow-icon-sort']"
              />
            </div>
          </div>
        </div>
        <div class="tr" v-for="(item, key) in sliceItemsByShow" :key="key">
          <div
            class="td"
            v-for="(item2, key2) in tableProps.header"
            :key="key2"
          >
            {{ item[item2.prop] }}
          </div>
          <div
            class="td d-flex justify-content-end"
            v-if="tableProps.footer.updateDelete"
          >
            <img
              class="btn-update mr-1"
              :data-title="getLocalizationtxt.personPage.update"
              src="@/assets/icons/update.svg"
              @click="updateItem(item.id)"
            />
            <img
              class="btn-delete"
              src="@/assets/icons/delete.svg"
              @click="deleteItem(item.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-footer">
      <div
        class="row-pagination-show d-flex align-items-center justify-content-end"
      >
        <div class="d-flex table-pagination-buttons mr-3">
          <button
            :class="[
              'btn-form btn-pagination mr-1',
              { grey: btnPagination.back.grey },
              { disabled: btnPagination.back.disabled },
            ]"
            :data-active="btnPagination.back.dataActive"
            @click="toPaginationTable(btnPagination.back.dataActive, 'back')"
          >
            <img
              src="@/assets/icons/arrow.svg"
              class="img-arrow-pagination img-left-arrow-pagination"
            />
          </button>
          <button
            v-for="(value, key) in paginationPageButtons"
            :key="key"
            class="btn-form ml-1 mr-1"
            :class="[paginationOptions.page === value ? 'disabled' : 'grey']"
            @click="changePaginationPage(value)"
          >
            <span v-if="value === 0">...</span>
            <span v-else>{{ value }}</span>
          </button>
          <button
            :class="[
              'btn-form btn-pagination ml-1',
              { grey: btnPagination.next.grey },
              { disabled: btnPagination.next.disabled },
            ]"
            :data-active="btnPagination.next.dataActive"
            @click="toPaginationTable(btnPagination.next.dataActive, 'next')"
          >
            <img
              src="@/assets/icons/arrow.svg"
              class="img-arrow-pagination img-right-arrow-pagination"
            />
          </button>
        </div>
        <div
          class="table-setting-box table-setting-show mr-5"
          v-if="tableProps.footer.show"
        >
          <span class="title-setting"
            >{{ getLocalizationtxt.personPage.show_table }} :
          </span>
          <input
            v-model="paginationOptions.pageSize"
            @input="changeShowTable"
            type="number"
            min="1"
            :max="itemsLength"
            class="input-form"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Languages from "@/types/Localization/Language/Languages";
import Persons from "@/types/Person/Persons";
import Query from "@/types/Table/Query";
import PaginationButtons from "@/types/Table/PaginationButtons";
import SortButtons from "@/types/Table/SortButtons";
import { sortArray, sliceArray } from "@/plugins/ArrayFunctions";

export default defineComponent({
  name: "TableView",
  data() {
    return {
      searchKeyword: "",
      paginationOptions: {
        page: 1,
        pageSize: 5,
        pageMaxLength: 0,
        mobile: false,
      },
      btnPagination: {
        back: {
          dataActive: "",
          grey: false,
          disabled: false,
        },
        next: {
          dataActive: "",
          grey: false,
          disabled: false,
        },
      },
      sortButtons: {
        id: "off",
        name: "off",
        surname: "off",
        phone: "off",
      },
      sortOptions: {
        prop: "id",
        to: "up",
      },
    };
  },
  props: {
    tableProps: {
      type: Object,
      required: true,
    },
    allItems: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.getQueryParams();
    this.updatePagination();
    window.addEventListener("resize", this.windowResize);
    this.windowResize();
  },
  computed: {
    itemsLength(): number {
      return this.searchedItems.length ? this.searchedItems.length : 1;
    },
    getLocalizationtxt(): Languages {
      return this.$store.getters["localizationInfo"];
    },
    sortedItems(): Persons[] {
      const options: any = {
        array: this.allItems,
        options: this.sortOptions,
      };
      return sortArray(options);
    },
    searchedItems(): Persons[] {
      return this.sortedItems.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key]
            .toString()
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase());
        });
      });
    },
    sliceItemsByShow(): Persons[] {
      const options = {
        array: this.searchedItems,
        options: this.paginationOptions,
      };
      return sliceArray(options);
    },
    paginationPageButtons(): Array<number> | number {
      const arrayPageButtons: Array<number> = [];
      let prevPage = +this.paginationOptions.page - 1;
      let nextPage = +this.paginationOptions.page + 1;
      if (this.paginationOptions.pageMaxLength > 6) {
        if (this.paginationOptions.page > 1) {
          arrayPageButtons.push(1);
          if (!this.paginationOptions.mobile) {
            if (this.paginationOptions.page > 3) {
              arrayPageButtons.push(0);
            }
          }
          if (this.paginationOptions.page > 2) {
            arrayPageButtons.push(prevPage);
          }
        }
        arrayPageButtons.push(this.paginationOptions.page);
        if (
          this.paginationOptions.page <
          this.paginationOptions.pageMaxLength - 1
        ) {
          arrayPageButtons.push(nextPage);
        }
        if (!this.paginationOptions.mobile) {
          if (
            this.paginationOptions.page <
            this.paginationOptions.pageMaxLength - 2
          ) {
            arrayPageButtons.push(0);
          }
        }
        if (
          this.paginationOptions.page != this.paginationOptions.pageMaxLength
        ) {
          arrayPageButtons.push(this.paginationOptions.pageMaxLength);
        }
      } else {
        arrayPageButtons.push(this.paginationOptions.pageMaxLength);
      }
      return arrayPageButtons.length > 1
        ? arrayPageButtons
        : arrayPageButtons[0];
    },
  },
  methods: {
    windowResize(): void {
      if (window.innerWidth <= 425) this.paginationOptions.mobile = true;
    },
    changeShowTable(): void {
      if (
        !this.paginationOptions.pageSize ||
        this.paginationOptions.pageSize > this.itemsLength
      )
        this.paginationOptions.pageSize = 5;
      this.toFirstPage();
      this.updateQuery();
      this.updatePagination();
    },
    checkpageMaxLength(): void {
      this.paginationOptions.pageMaxLength = Math.ceil(
        this.searchedItems.length / this.paginationOptions.pageSize
      );
    },
    toPaginationTable(active: string, name: string): void {
      if (active != "") {
        if (name === "next")
          this.paginationOptions.page =
            +this.paginationOptions.page + 1 <=
            this.paginationOptions.pageMaxLength
              ? +this.paginationOptions.page + 1
              : this.paginationOptions.page;
        else if (name === "back")
          this.paginationOptions.page =
            this.paginationOptions.page > 2
              ? +this.paginationOptions.page - 1
              : 1;
      }
      this.checkPaginationButtonActive();
    },
    toFirstPage(): void {
      this.paginationOptions.page = 1;
      if (this.searchedItems) this.updatePagination();
    },
    changePaginationPage(value: number): void {
      if (!isNaN(value) && value != 0) {
        this.paginationOptions.page = value;
        this.updatePagination();
      }
    },
    checkPaginationButtonActive(): void {
      if (this.paginationOptions.page == 1 && this.searchedItems.length != 0) {
        if (this.paginationOptions.pageMaxLength == 1) {
          this.checkPrevNextPagination("back", false);
          this.checkPrevNextPagination("next", false);
        } else {
          this.checkPrevNextPagination("back", false);
          this.checkPrevNextPagination("next", true);
        }
      } else if (
        this.paginationOptions.page == this.paginationOptions.pageMaxLength
      ) {
        this.checkPrevNextPagination("back", true);
        this.checkPrevNextPagination("next", false);
      } else if (
        this.searchedItems.length == 0 ||
        this.paginationOptions.pageMaxLength == 0
      ) {
        this.checkPrevNextPagination("back", false);
        this.checkPrevNextPagination("next", false);
      } else {
        this.checkPrevNextPagination("back", true);
        this.checkPrevNextPagination("next", true);
      }
    },
    updatePagination(): void {
      this.checkpageMaxLength();
      this.checkPaginationButtonActive();
    },
    checkPrevNextPagination(element: string, turn: boolean): void {
      const objBtnPagination: PaginationButtons = this.btnPagination;
      if (turn) {
        objBtnPagination[element].dataActive = "active";
        objBtnPagination[element].grey = true;
        objBtnPagination[element].disabled = false;
      } else {
        objBtnPagination[element].dataActive = "";
        objBtnPagination[element].grey = false;
        objBtnPagination[element].disabled = true;
      }
    },
    sortByItem(dataID: string, sortKey: string): void {
      const objSortButtons: SortButtons = this.sortButtons;
      objSortButtons.id = "off";
      objSortButtons.name = "off";
      objSortButtons.surname = "off";
      objSortButtons.phone = "off";
      if (dataID === "down") {
        this.sortOptions.prop = sortKey;
        this.sortOptions.to = "up";
        objSortButtons[sortKey] = "up";
      } else if (dataID === "up") {
        if (sortKey != "id") {
          this.sortOptions.prop = "id";
          this.sortOptions.to = "up";
          objSortButtons.id = "up";
        }
      } else if (dataID === "off") {
        this.sortOptions.prop = sortKey;
        this.sortOptions.to = "down";
        objSortButtons[sortKey] = "down";
      }
      this.updateQuery();
    },
    getQueryParams(): void {
      const objSortButtons: SortButtons = this.sortButtons;
      if (this.$route.query.sort && this.$route.query.sortTo) {
        this.sortOptions.prop = this.$route.query.sort as string;
        this.sortOptions.to = this.$route.query.sortTo as string;
        objSortButtons[this.$route.query.sort as string] = this.$route.query
          .sortTo as string;
      } else {
        this.sortOptions.prop = "id";
        this.sortOptions.to = "up";
        objSortButtons[this.sortOptions.prop as string] = this.sortOptions
          .to as string;
      }
      this.searchKeyword = this.$route.query.search
        ? (this.$route.query.search as string)
        : this.searchKeyword;
      this.paginationOptions.pageSize = this.$route.query.show
        ? +this.$route.query.show
        : this.paginationOptions.pageSize;
    },
    updateQuery(): void {
      const query: Query = {
        show: this.paginationOptions.pageSize,
        sort: this.sortOptions.prop,
        sortTo: this.sortOptions.to,
      };
      if (this.searchKeyword != "") query["search"] = this.searchKeyword;
      this.$router.push({ query });
    },
    deleteItem(id: number): void {
      this.$emit("deleteItem", id);
    },
    updateItem(id: number): void {
      this.$emit("updateItem", id);
    },
  },
  watch: {
    searchedItems(): void {
      this.paginationOptions.page = 1;
      this.updatePagination();
    },
    searchKeyword(): void {
      this.updateQuery();
      this.toFirstPage();
    },
    "tableProps.footer.updatePagination"(): void {
      this.updatePagination();
    },
  },
});
</script>

<style lang="scss" scoped>
.table {
  width: 80%;
  margin: 0 auto;
  border: solid 1px #ced4da;
  background-color: rgb(255 255 255 / 10%);

  .table-header {
    margin-bottom: 20px;
    padding-top: 15px;

    .table-title {
      text-align: center;
      margin-bottom: 20px;
    }

    .table-settings {
      padding: 0 20px;
    }
  }

  .table-body {
    padding: 10px 20px;

    .myTable {
      min-height: 175px;

      .tr {
        display: grid;
        grid-template-columns: 4% repeat(5, 1fr);
        padding: 5px 0;
      }
      .tr:not(.top):hover {
        background-color: #ced4da;
      }
      .tr.top {
        border-bottom: 2px solid #4a5156;
      }
      .tr.top .th {
        cursor: pointer;
      }
      .tr.top .th:hover .arrow-icon-sort {
        display: block;
      }
      .tr.top .th span {
        pointer-events: none;
      }
      .tr.top .th .arrow-icon-sort {
        width: 10px;
        pointer-events: none;
        display: none;
      }
      .tr.top .th .arrow-icon-sort.off {
        transform: rotateZ(90deg);
      }
      .tr.top .th .arrow-icon-sort.down {
        transform: rotateZ(0deg);
      }
      .tr.top .th .arrow-icon-sort.up {
        transform: rotateZ(180deg);
      }
      .th {
        font-weight: bold;
      }
      .th,
      .td {
        padding: 0 5px;

        .btn-update,
        .btn-delete {
          cursor: pointer;
          width: 15px;
        }
      }

      .table-pagination-buttons {
        display: flex;
        justify-content: flex-end;
        margin-left: 20px;

        .btn-pagination:nth-child(1) {
          margin-right: 5px;
        }
      }
    }
  }

  .table-footer {
    padding: 10px 20px;

    .btn-pagination {
      position: relative;
      padding: 12px 16px;

      .img-arrow-pagination {
        width: 12px;
        position: absolute;
        pointer-events: none;
      }
      .img-left-arrow-pagination {
        transform: translate(-50%, -50%) rotateZ(90deg);
      }
      .img-right-arrow-pagination {
        transform: translate(-50%, -50%) rotateZ(270deg);
      }
    }

    .table-person-add {
      display: flex;
      justify-content: end;
    }
  }
}

@media only screen and (max-width: 425px) {
  .table {
    width: 96%;

    .table-settings {
      display: flex;
      justify-content: center;
    }

    .table-body {
      overflow-x: scroll;

      .myTable {
        width: max-content;
      }
    }
  }
  .row-pagination-show {
    flex-direction: column;
    align-items: flex-end;

    .table-pagination-buttons,
    .table-setting-show {
      margin: 0 0 20px;
    }
  }
}
</style>
