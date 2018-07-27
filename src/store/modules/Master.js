import Vue from 'vue';

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  actGetBankData: (context, params) => {
    // Define the URL
    let url = `https://app.fyle.in/api/bank_branches`;

    return new Promise(function(resolve, reject) {
      Vue.http.get(url, { params }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  }
}

export const Master = { state, getters, mutations, actions }
