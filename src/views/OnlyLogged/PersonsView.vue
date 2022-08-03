<template>
  <div id="Persons">
    <PersonsTableView />
  </div>
</template>

<script>
import PersonsTableView from "@/components/PersonsTableView";

export default {
  name: "PersonsView",
  components: { PersonsTableView },
};
</script>
