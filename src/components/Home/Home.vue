<template>
  <div class="main-wrapper">
    <div class="fye-search-contain">
      <div class="fye-head card">
        <div class="fye-h-slct">
          <img src="@/assets/arrow-down.svg" alt="">
          <select class="fye-hslct-input" v-model="city">
            <option v-for="(name, i) in cityNames" :key="i" :value="name">{{name}}</option>
          </select>
        </div>

        <div class="fye-h-search">
          <form @submit.prevent="searchInputCB">
            <div class="fye-hsearch-input">
              <img src="@/assets/search-ico.svg" alt="">
              <input type="search" placeholder="City name here.." v-model="searchCityInp">
            </div>
          </form>
        </div>

        <div class="clearfix"></div>
      </div>

      <div class="fye-loader" v-if="showLoading">
        <img src="@/assets/loading.svg" alt="">
      </div>

      <div class="fye-result card">
        <div class="fye-result-table" v-if="showTable">
          <table>
            <thead>
              <tr>
                <th>IFSC</th>
                <th>Name</th>
                <th>Branch</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(bank, i) in data" :key="i">
                <td>{{bank.ifsc || '---'}}</td>
                <td>{{bank.bank_name || '---'}}</td>
                <td>{{bank.branch || '---'}}</td>
                <td>{{bank.city || '---'}}</td>
                <td>{{bank.district || '---'}}</td>
                <td>{{bank.state || '---'}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="fye-no-results" v-else>
          <h4>Sorry! No results found.</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Home',
    data () {
      return {
        cityNames: [ 'Bangalore', 'Mumbai', 'Delhi', 'Kolkatha', 'Kochi' ],
        city: 'Bangalore',
        data: null,
        searchCityInp: '',
        showLoading: true,
        showTable: false
      }
    },
    created () {
      this.initTemp()
    },
    watch: {
      city (city) {
        city = city.toUpperCase();
        this.fetchData(city);
      }
    },
    methods: {
      ...mapActions([
      'actGetBankData'
      ]),
      initTemp () {
        let city = this.city.toUpperCase();

        this.fetchData(city);
      },
      searchInputCB () {
        let city = this.searchCityInp.toUpperCase();

        if (city && city.length > 3) {
          this.fetchData(city);
        }

      },
      fetchData (city) {
        this.showLoading = true;
        this.showTable = false;

        let offset = 0;
        let limit = 50;

        let params = { city, offset, limit };

        this.actGetBankData(params).then(response => {
          if (response && response.length) {
            this.data = response;

            this.showLoading = false;
            this.showTable = true;
          } else {
            this.showLoading = false;
            this.showTable = false;
          }
        }).catch(error => {
          // console.log('[initTemp -> error]', error)
        });
      }
    }
  }
</script>

<style lang="css">
  .fye-search-contain {
    width: 90%;
    margin: 2em auto;
  }
  .fye-head {
    margin-bottom: 15px;
  }
  .card {
    background-color: #fff;
    padding: 2em 3em;
    border-radius: 4px;
    box-shadow: 0px 1px 12px 1px #e0e0e0;
  }

  .fye-h-slct {
    float: left;
    position: relative;

  }
  .fye-h-slct img {
    position: absolute;
    width: 10px;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
  .fye-hsearch-input {
    position: relative;
  }
  .fye-hsearch-input img {
    position: absolute;
    width: 14px;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  .fye-h-search {
    float: right;
  }
  .clearfix {
    clear: both;
  }

  select, input[type="text"], input[type="search"] {
    -webkit-appearance: none;
    outline: none;
    border: 1px solid #999;
    border-radius: 2px;
    border-radius: 2px;
    background-color: transparent;
  }
  select {
    -webkit-appearance: none;
    padding: 8px 25px 8px 15px;
  }
  input[type="text"], input[type="search"] {
    padding: 10px 20px 10px 40px;
  }

  table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
    border-collapse: collapse;
  }
  table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
    padding: 10px 15px;
    text-align: left;
  }
  table tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  table tbody td {
    padding: 16px 10px;
    color: #757575;
    font-size: 13px;
  }
  .fye-no-results {
    text-align: center;
  }
  .fye-loader {
    text-align: center;
  }
  .fye-loader img {
    width: 50px;
  }
</style>
