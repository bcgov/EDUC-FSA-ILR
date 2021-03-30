<template>
  <div class="container">
    <h1>Foundation Skills Assessment Reports</h1>
    <form action="" method="GET" @submit.prevent="search">
    <span><strong class="p-1">Select a District</strong></span>
    <b-form-input list="my-list-id" @change="saveSelectionAndReset" @focus="clearSchool" v-model="school"></b-form-input>
     
      <table class="uk-table uk-table-small filter">
        <tbody>
         
          <tr>
            <td>
              <datalist id="my-list-id">
                <option>Select a District</option>
                <option v-for="school in schoolList" v-bind:key="school.school_or_district_id" :value="school.school_or_district_id">{{ school.school_or_district_name }}</option>
              </datalist>
              
            </td>
          </tr>
          <tr>
            <th class="p-1">Year</th>
            <th class="p-1">Grade</th>
            <th class="p-1">Subject</th>
            <th class="p-1">Language</th>
            <th class="p-1">Gender</th>
            <th class="p-1">Francophone</th>
            <th class="p-1">French Immersion</th>
            <th class="p-1">ELL</th>
            <th class="p-1">Indigenous</th>
          </tr>
          <tr>

            <td class="p-1">
              <select v-model="year" class="form-control" @change="search">
                <option v-for="option in yearOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>

            </td>

            <td class="p-1">
              <select v-model="grade" class="form-control" @change="search">
                <option v-for="option in gradeOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>
            </td>


            <td class="p-1">
              <select v-model="subject" class="form-control" @change="search" >
                <option v-for="option in subjectOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>
            </td>

            <td class="p-1">
              <select v-model="examLanguage" class="form-control" @change="search">
                <option v-for="option in examLanguageOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="p-1">
              <select v-model="gender" class="form-control" @change="search">
                <option v-for="option in genderOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="p-1"> <select v-model="francophone" class="form-control" @change="search">
              
                <option v-for="option in francophoneOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>
            </td>

            <td class="p-1"> <select v-model="frenchImmersion" class="form-control" @change="search">
                <option v-for="option in frenchImmersionOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="p-1"> <select v-model="ell" class="form-control" @change="search">
                <option v-for="option in ellOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>

            <td class="p-1"> <select v-model="indigenous" class="form-control" @change="search">
                <option v-for="option in indigenousOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select></td>
            <td>
              <button class="btn btn-secondary" @click="resetSearch()">Clear All</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <div>
      <h2 class="search-filters border-bottom pt-5">
        <span v-if="school">
          {{school}}
        </span>
      </h2>
      <h4 class="header">
        Filters: 
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
      </h4>
    </div>
    <div v-if='searchMessage' class="search-results-message">
      {{searchMessage}}
    </div>
    
    <div id="results">
      <div>
        <b-tabs content-class="mt-3">

          <b-tab v-if="aSelectedResponses.length" title="A: SELECTED RESPONSE">
            <template>
              <div>
                <b-table striped hover :items="this.aSelectedResponses" :fields="aSelectedResponsesFields">
                </b-table>
              </div>
            </template>
          </b-tab>
          <b-tab v-if="!aSelectedResponses.length" title="A: SELECTED RESPONSE" disabled>
            <template>
              <div>
                There are no responses for this section. Please view other sections if available, or change your filter parameters.
              </div>
            </template>
          </b-tab>
          <b-tab v-if="bConstructedResponses.length" title="B: CONSTRUCTED RESPONSE">
              <b-table striped hover :items="this.bConstructedResponses" :fields="bConstructedResponsesFields">
              </b-table>
          </b-tab>
          <b-tab v-if="!bConstructedResponses.length" title="B: CONSTRUCTED RESPONSE" disabled>
              <div>
                There are no responses for this section. Please view other sections if available, or change your filter parameters.
              </div>
          </b-tab>          
          <b-tab v-if="cCognitiveResponses.length" title="C: COGNITIVE LEVELS">
              <b-table striped hover :items="this.cCognitiveResponses" :fields="fieldsC">
              </b-table>
          </b-tab>
          <b-tab v-if="!cCognitiveResponses.length" title="C: COGNITIVE LEVELS">
              <div>
                There are no responses for this section. Please view other sections if available, or change your filter parameters.
              </div>
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
        aSelectedResponsesFields: [{
            key: 'content',
            label: 'CONTENT',
          }, {
            key: 'item',
            label: 'ITEM #',
          },
          {
            key: 'cognitive_level',
            label: 'COGNITIVE LEVEL',
          },
          {
            key: 'number_of_respondents',
            label: 'RESPONDENTS'
          },
          {
            key: 'degree_of_difficulty',
            label: 'DEGREE OF DIFFICULTY'
          },
          {
            key: 'percent_correct',
            label: '% CORRECT'
          },
          {
            key: 'percent_incorrect',
            label: '% INCORRECT',
          },
          {
            key: 'item_descriptor',
            label: 'ITEM DESCRIPTOR',
          },
        ],
        aSelectedResponses: {},
        bConstructedResponsesFields: [{
            key: 'content',
            label: 'CONTENT	ITEM #',
          }, {
            key: 'item',
            label: 'WRITERS',
          },
          {
            key: 'num_of_score_0',
            label: 'SCORE 0',
          },
          {
            key: 'num_of_score_1',
            label: 'SCORE 1'
          },
          {
            key: 'num_of_score_2',
            label: 'SCORE 2'
          },
          {
            key: 'num_of_score_3',
            label: 'SCORE 3'
          },
          {
            key: 'num_of_score_4',
            label: 'SCORE 4',
          },
          {
            key: 'description',
            label: 'ITEM DESCRIPTOR',
          },
        ],

        bConstructedResponses: {},
         fieldsC: [{
            key: 'cognitive_level',
            label: 'COGNITIVE LEVEL',
          }, {
            key: 'cognitive_level_description',
            label: 'RECALL',
          },
          {
            key: 'number_of_items',
            label: 'NO OF ITEMS',
          },
          {
            key: 'number_of_students_responding',
            label: 'NO OF STUDENTS WHO RESPONDED'
          },
          {
            key: 'pct_correct',
            label: 'PERCENTAGE OF STUDENTS WITH CORRECT RESPONSES'
          }
        ],
        cCognitiveResponses: {},
        school: 'All Public Schools',
        schoolList: SchoolsList,
        year: '2019-2020',
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
        grade: "04",
        gradeOptions: [{
            text: '4',
            value: '04'
          },
          {
            text: '7',
            value: '07'
          },
        ],
        subject: "Reading",
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
      this.search();
    },
    methods: {
      search: function () {
        this.searchMessage = "";
        this.aSelectedResponses = {};
        this.bConstructedResponses = {};
        this.cSelectedResponse = {};
        ResponseService.getASelectedResponse(this.school, this.year, this.grade, this.subject, this.examLanguage, this
          .gender, this.francophone, this.frenchImmersion, this.ell, this.indigenous).then((response) => {
          this.aSelectedResponses = response.data;
        });
        ResponseService.getBConstructedResponse(this.school, this.year, this.grade, this.subject, this.examLanguage, this
          .gender, this.francophone, this.frenchImmersion, this.ell, this.indigenous).then((response) => {
          this.bConstructedResponses = response.data;
        });
        ResponseService.getCCognitiveResponse(this.school, this.year, this.grade, this.subject, this.examLanguage, this
          .gender, this.francophone, this.frenchImmersion, this.ell, this.indigenous).then((response) => {
          this.cCognitiveResponses = response.data;
        });
      },
      resetSearch: function(){
          this.searchMessage = "";
          this.aSelectedResponses = {};
          this.bConstructedResponses = {};
          this.cSelectedResponse = {};
          this.school = "";
          this.year = "";
          this.grade = "";
          this.subject = "";
          this.examLanguage = "";
          this.gender = "";
          this.francophone = "";
          this.frenchImmersion= "";
          this.ell= "";
          this.indigenous;
          this.saveSelectionAndReset(); 
          
      },
      clearSchool: function(){
        this.school = "";
      },
      saveSelectionAndReset(e) {
        let val = e;
        if (val) {
          this.school = val;
        }
        e = "";
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2.search-filters span+span::before {
    content: " | "
  }
  h4.header span + span::before{
    content: " | "

  }
  .clear-button{
    float:right;
  }
</style>