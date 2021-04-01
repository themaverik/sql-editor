<template>
  <div id="result" class="container my-md-4 bd-layout">
    <table class="table table-striped table-hover table-bordered table-sm">
      <thead>
        <tr>
          <th v-for="(column, index) in results.header" :key="index"> {{ column.toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in results.row" :key="index">
          <td v-for="(column, colIndex) in row" :key="colIndex">{{ column }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Result',
  computed: {
    results() {
      let results = this.$store.state.results;
      if (results == null) {
        return {
          row: {},
          header: []
        };
      } else {
        // let table = this.$store.state.results.table;
        let rows = results.results;
        let table = results.table;

        // set missing properties to create table in proper format
        if (table != null) {
          // we are querying specific db object like like data from a specific table
          // get all column headers
          const header = rows.reduce((keys, obj) => (
            keys.concat(Object.keys(obj[table]).filter(key => (
              keys.indexOf(key) === -1)))
          ), []);
          let newrows = rows.map((data) => {
            if (typeof data[table] !== 'undefined') {
              let db_obj = data[table];
              header.forEach((element) => {
                if (typeof (db_obj[element]) === 'undefined') {
                  db_obj[element] = '';
                }
              });
              return db_obj;
            }
          });
          let obj = {
            row: newrows,
            header: header
          };
          return obj;
        } else {
          // get all column headers
          const header = rows.reduce((keys, obj) => (
            keys.concat(Object.keys(obj).filter(key => (
              keys.indexOf(key) === -1)))
          ), []);

          rows.forEach((data) => {
            header.forEach((element) => {
              if (typeof (data[element]) === 'undefined') {
                data[element] = '';
              }
            })
          });
          return {
            row: rows,
            header: header
          };
        }
      }
    },
    methods: {
      clearResuts() {
        this.$store.dispatch('clearSQLResults')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#result {
  clear: both;
  margin-top: 15px;
  max-height: 500px;
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
