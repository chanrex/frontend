<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    :disable-initial-sort="true"
    :loading="loading"
    hide-actions
    class="elevation-1"
  >
    <v-progress-linear 
      slot="progress" 
      color="blue" 
      indeterminate/>
    <template 
      slot="items" 
      slot-scope="props"
    >
      <td>{{ props.item.full_name }}</td>
      <td class="text-xs-right">{{ props.item.email }}</td>
      <td class="text-xs-right">
        <a 
          :href="'http://kovan.etherscan.io/address/' + props.item.ethereum_address" 
          target="_blank">
          {{ props.item.ethereum_address }}
        </a>
      </td>
      <td class="text-xs-right">{{ numberToCurrency(props.item.ethBalance) }}</td>
      <td class="text-xs-right">{{ numberToCurrency(props.item.fstBalance) }}</td>
      <td class="text-xs-right">{{ numberToCurrency(props.item.filBalance) }}</td>
      <td class="text-xs-right">{{ numberToCurrency(props.item.qtsBalance) }}</td>
      <td class="text-xs-right">{{ numberToCurrency(props.item.gasTankBalance) }}</td>
      <td>{{ props.item.latestTime }}</td>
      <td>
        <a 
          :href="'http://kovan.etherscan.io/tx/' + props.item.txHash" 
          target="_blank">
          {{ shorten(props.item.txHash) }}
        </a>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { apiEndPoint } from '../config/contractAddress.js';
import numberToCurrencyFormat from '../utils/numberToCurrencyFormate.js';

export default {
  data() {
    return {
      loading: true,
      headers: [
        {
          text: 'User Name',
          align: 'center',
          sortable: false,
          value: 'full_name',
        },
        {
          text: 'Email',
          align: 'center',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Address',
          align: 'center',
          sortable: false,
          value: 'ethereum_address',
        },
        {
          text: 'ETH',
          align: 'center',
          value: 'ethBalance',
        },
        {
          text: 'FST',
          align: 'center',
          value: 'fstBalance',
        },
        {
          text: 'FIL',
          align: 'center',
          value: 'filBalance',
        },
        {
          text: 'QTS',
          align: 'center',
          value: 'qtsBalance',
        },
        {
          text: 'Gas Tank',
          align: 'center',
          value: 'gasTankBalance',
        },
        {
          text: 'execute time',
          align: 'center',
          value: 'latestTime',
        },
        {
          text: 'Last txHash',
          align: 'center',
          vlaue: 'txHash',
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    fetch(apiEndPoint + 'getAllUser')
      .then(res => res.text())
      .then(body => {
        console.log('done: ', JSON.parse(body));
        this.loading = false;
        let { data } = JSON.parse(body);
        this.tableData = data;
      });
  },
  methods: {
    numberToCurrency: function(_input) {
      return numberToCurrencyFormat(_input);
    },
    shorten: function(_input) {
      if (_input && _input != undefined) {
        if (_input.length > 30) {
          return _input.slice(0, 21) + '...';
        }
      }
      return _input;
    },
  },
};
</script>
