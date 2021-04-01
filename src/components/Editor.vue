<template>
  <div id="sqleditor" class="container my-md-4 bd-layout">
    <nav class="bd-subnavbar" aria-label="Editor controls">
      <!-- TODO Add component for editor controls -->
      <b-button-toolbar>
        <b-button-group class="">
          <b-button 
          @click="execute()" 
            size="sm" 
            variant="outline-info" 
            class="mb-2"
            v-b-tooltip.hover title="Execute SQL query"
            >
            <b-icon icon="play-fill" aria-hidden="true"></b-icon> Run
          </b-button>
          <b-button 
            size="sm" 
            variant="outline-info" class="mb-2"
            @click.prevent="downloadReport()"
            v-b-tooltip.hover title="Export query results as CSV"
            >
            <b-icon icon="cloud-download-fill" aria-hidden="true"></b-icon> Download
          </b-button>
          <b-button 
            @click="clear()" 
            size="sm" 
            variant="outline-info" 
            class="mb-2"
            v-b-tooltip.hover title="Clear query editor"
            >
            Clear <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </nav>
    <b-tabs>
      <b-tab title="Edit SQL" active>
        <textarea class="form-control" id="editor-area" rows="10" 
        @keydown.enter.shift.exact.prevent="execute($event)"
        v-model="sql">
        </textarea>
      </b-tab>
    </b-tabs>
    <div class="alert-msg">
      <b-alert v-if = !multilineAlert
        v-model="showAlert"
        :dismissible="dismissible" 
        :variant="alertType">
          {{ message[0] }}
      </b-alert>
      <b-alert v-else
        v-model="showAlert"
        :dismissible="dismissible" 
        :variant="alertType">
        <p v-for="(msg, key) in message" :key="key" class="mb-0">
        {{ msg }} 
        </p>
        <hr>
      </b-alert>
    </div>
  </div>
</template>

<script>
const __BASE_URL = "../data/";
import axios from 'axios'

export default {
  name: 'Editor',
  data() {
    return {
      sql: null,
      message: [],
      showAlert: false,
      alertType: 'info',
      multilineAlert: false,
      dismissible: false,
      reportLink: null
    }
  },
  mounted() {
    let msg = [];
    msg.push("Hello there! Welcome to AT SQL editor. Please enter any of the following queries to test:")
    msg.push("1. select * from customers");
    msg.push("2. select * from orders");
    msg.push("3. select * from orders where customer_id='ALFKI'");
    this.setMessageAlert(msg, "info", false, true);
  },
  methods: {
    clear() {
      this.sql = null;
    },
    setMessageAlert(msg, alert_type, dismissible, multiline) {
      this.message = msg;
      this.showAlert = true;
      this.alertType = alert_type;
      this.dismissible = dismissible;
      this.multilineAlert = multiline;
    },
    execute() {
      // very basic SQL syntax validator based on predefined SQL statements
      // we just mock table data based on predefined sql 

      let sql = this.sql;
      if (sql != null) {
        sql = sql.trim()
      }

      // table names for demo purpose only
      const __DATA_LAYER_TABLE_API = ['customers', 'orders'];
      const __SPEC_FORMAT = ".json";
      const __REPORT_FORMAT = ".csv";

      // init mock data layer driver
      let __data_layer_resource = '';
      let __query_table = null;
      if (sql === 'select * from customers') {
        __data_layer_resource = __DATA_LAYER_TABLE_API[0];
      } else if (sql === 'select * from orders') {
        __query_table = "order";
        __data_layer_resource = __DATA_LAYER_TABLE_API[1];
      } else if (sql === "select * from customers where customer_id='ALFKI'") {
        __query_table = __DATA_LAYER_TABLE_API[0];
        __data_layer_resource = __query_table + "/ALFKI";
      } else if (sql === "select * from orders where customer_id='ALFKI'") {
        __query_table = "order";
        __data_layer_resource = __DATA_LAYER_TABLE_API[0] + "/ALFKI/orders";
      } else if (sql != null && sql != '') {
        // report invalid sql for any other input
        let msg = [];
        msg.push("The statement is not a valid SQL. For demo purpose, use the following SQL query to test:")
        msg.push("1. select * from customers");
        msg.push("2. select * from orders");
        msg.push("3. select * from orders where customer_id='ALFKI'");
        this.setMessageAlert(msg, "info", true, true)
        this.sql = null;
      } else {
        this.setMessageAlert(["Please enter a query to execute"], "info", false, false)
      }
      if (sql !== '' && __data_layer_resource !== '') {
        const url = __BASE_URL + __data_layer_resource + __SPEC_FORMAT;
        this.reportLink = __BASE_URL + __data_layer_resource + __REPORT_FORMAT;
        let that = this;
        this.setMessageAlert("Executing query...", "info", false)
        let endTime = 0;
        const startTime = Date.now();
        axios.get(url).then(response => {
          endTime = Date.now();
          that.results = response.data;
          const result_obj = {
            results: that.results.results,
            table: __query_table
          }
          that.$store.dispatch('setResults', Object.freeze(result_obj));
          this.setMessageAlert(["Query executed successfully in " + (endTime - startTime) / 1000 + " seconds"], "success", false, false)
        })
      }
    },
    downloadReport() {
      if (this.reportLink != null) {
        axios.get(this.reportLink).then(response => {
          const blob = new Blob([response.data], {
            type: 'text/csv'
          })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = 'Report.csv'
          link.click()
          URL.revokeObjectURL(link.href)
        })
      } else {
        this.setMessageAlert(["There are no reports to download. Please exeute a query to export the results."], "info", true, false);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sqleditor {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

textarea {
  resize: vertical;
}

.result {
  clear: both;
  margin-top: 15px;
}

.alert-msg {
  margin-top: 10px;
  text-align: left;
}
</style>
