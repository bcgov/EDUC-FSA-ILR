<template>
  <div class="container">
    <h1>Foundation Skills Assesment Reports</h1>
    <form action="" method="GET" @submit.prevent="search">

    <b-form-input list="my-list-id" @input="saveSelectionAndReset"></b-form-input>




      <table class="uk-table uk-table-small filter">
        <tbody>
          <tr>
            <th colspan="100">
              School or District
            </th>
          </tr>
          <tr>
            <td colspan="100">
              
              <datalist id="my-list-id">
   
                <option>Manual Option</option>
                <option v-for="scool in schoolList" v-bind:key="scool.school_or_district">{{ scool.school_or_district }}</option>

              </datalist>
            </td>
          </tr>
          <tr>
            <th class="w-100 p-3">Year</th>
            <th class="w-100 p-3">Grade</th>
            <th class="w-100 p-3">Subject</th>
            <th class="w-100 p-3">Exam Language</th>
            <th class="w-100 p-3">Gender</th>
            <th class="w-100 p-3">Francophone</th>
            <th class="w-100 p-3">French Immersion</th>
            <th class="w-100 p-3">ELL</th>
            <th class="w-100 p-3">Indigenous</th>
          </tr>
          <tr>

            <td class="w-100 p-3">
              <select v-model="year">
                <option v-for="option in yearOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>

            </td>

            <td class="w-100 p-3">
              <select v-model="grade">
                <option v-for="option in gradeOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>
            </td>


            <td class="w-100 p-3">
              <select v-model="subject">
                <option v-for="option in subjectOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>
            </td>

            <td class="w-100 p-3">
              <select v-model="examLanguage">
                <option v-for="option in examLanguageOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="w-100 p-3">
              <select v-model="gender">
                <option v-for="option in genderOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="w-100 p-3"> <select v-model="francophone">
                <option v-for="option in francophoneOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>
            </td>

            <td class="w-100 p-3"> <select v-model="frenchImmersion">
                <option v-for="option in frenchImmersionOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="w-100 p-3"> <select v-model="ell">
                <option v-for="option in ellOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="w-100 p-3"> <select v-model="indigenous">
                <option v-for="option in indigenousOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

          </tr>
          <tr>
            <td class="uk-text-right" colspan="100">
              <button type="submit" class="uk-button uk-button-large uk-button-primary filter-update-btn">Filter
                Report&nbsp;<i class="fas fa-arrow-circle-right"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <h2 class="search-filters">
      <span v-if="school">
        {{school}}
      </span>
      <span v-if="year">
        {{year}}
      </span>
      <span v-if="grade">
        Grade {{grade}}
      </span>
      <span v-if="subject">
        {{subject}}
      </span>
      <span v-if="examLanguage">
        {{examLanguage}}
      </span>
      <span v-if="gender != 'all'">
        {{gender}}
      </span>
      <span v-if="francophone=='Yes'">
        Francophone
      </span>
      <span v-if="frenchImmersion=='Yes'">
        French Immersion
      </span>
      <span v-if="ell == 'Yes'">
        ELL
      </span>
      <span v-if="indigenous == 'Yes'">
        Indigenous
      </span>
    </h2>
    <div v-if='searchMessage' class="search-results-message">
      {{searchMessage}}
    </div>
    <div id="results" v-if="!this.aSelectedResponses.length">
       There are no results for your search.
    </div>
    <div id="results" v-if="this.aSelectedResponses.length">
      <div>
        <b-tabs content-class="mt-3">

          <b-tab title="A: SELECTED RESPONSE" active>
            <template>
              <div>
                <b-table striped hover :items="this.aSelectedResponses" :fields="fields">
                </b-table>
              </div>
            </template>
          </b-tab>
          <b-tab title="B: SELECTED RESPONSE">
            B Responses
          </b-tab>
          <b-tab title="C: SELECTED RESPONSE">
            <slot></slot>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import SchoolsList from "@/services/SchoolService.json";
  import ResponseService from "@/services/ResponseService.js";
  export default {
    name: 'FSA',
    data() {
      return {
        searchMessage: "",
        fields: [{
            key: 'content',
            label: 'Content',
          }, {
            key: 'item',
            label: 'Item #',
          },
          {
            key: 'cognitive_level',
            label: 'Cognitive Level',
          },
          {
            key: 'number_of_respondents',
            label: 'Number of Respondents'
          },
          {
            key: 'degree_of_difficulty',
            label: 'Degree of Difficulty'
          },
          {
            key: 'percent_correct',
            label: '% Correct'
          },
          {
            key: 'percent_incorrect',
            label: '% Incorrect',
          },
          {
            key: 'item_descriptor',
            label: 'Item Descriptor',
          },
        ],
        aSelectedResponses: {},
        bSelectedResponses: {},
        cSelectedResponses: {},
        school: 'all',
        schoolList: SchoolsList,
        year: '2017',
        yearOptions: [{
            text: '2017',
            value: '2017-2018'
          },
          {
            text: '2018',
            value: '2018-2019'
          },
          {
            text: '2019',
            value: '2019-2020'
          }
        ],
        grade: "4",
        gradeOptions: [{
            text: '4',
            value: '04'
          },
          {
            text: '7',
            value: '07'
          },
        ],
        subject: "",
        subjectOptions: [{
            text: 'Reading',
            value: 'Reading'
          },
          {
            text: 'Numeracy',
            value: 'Numeracy'
          },
          {
            text: 'Writing',
            value: 'Writing'
          },
        ],
        examLanguage: "English",
        examLanguageOptions: [{
            text: 'English',
            value: 'English'
          },
          {
            text: 'French',
            value: 'French'
          },
        ],
        gender: "all",
        genderOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'Male',
            value: 'Male'
          },
          {
            text: 'Female',
            value: 'Female'
          },

        ],
        francophone: "all",
        francophoneOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'Yes',
            value: 'Yes'
          },
          {
            text: 'No',
            value: 'No'
          },
        ],
        frenchImmersion: "all",
        frenchImmersionOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'Yes',
            value: 'Yes'
          },
          {
            text: 'No',
            value: 'No'
          },
        ],
        ell: "all",
        ellOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'Yes',
            value: 'Yes'
          },
          {
            text: 'No',
            value: 'No'
          },
        ],
        indigenous: "all",
        indigenousOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'Yes',
            value: 'Yes'
          },
          {
            text: 'No',
            value: 'No'
          },
        ]
      }

    },
    created() {
      console.log(this.schoolList)
    },
    methods: {
      search: function () {
        this.searchMessage = "";
        this.aSelectedResponse = {};
        this.bSelectedResponse = {};
        this.cSelectedResponse = {};
        ResponseService.getASelectedResponse(this.school, this.year, this.grade, this.subject, this.examLanguage, this
          .gender, this.francophone, this.frenchImmersion, this.ell, this.indigenous).then((response) => {
          this.aSelectedResponses = response.data;
        });
        this.bSelectedResponse = "B responses";
        this.cSelectedResponse = "C Responses";
      },
      saveSelectionAndReset(e) {
        console.log("select")
        let val = e;
        if (val) {
          this.school = val;
        }
        e = "";
        console.log(this.school);  
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2.search-filters span+span::before {
    content: " | "
  }
</style>