<template>
  <div class="container">
    <h1>Foundation Skills Assessment Reports</h1>
    <form action="" method="GET" @submit.prevent="search">
    
            <div class="row">
    <div class="col-6">
        <span><strong class="p-1">Select a Report</strong></span>
      <select class="form-control" v-model="districtOption">
        <optgroup label="Select a report">
        <option value="All Public Schools">All Public Schools</option>
        <option value="All External Schools">All External Schools</option>
        <option value="All Independent Schools">All Independent Schools</option>
        <option value="All Schools">All Schools</option>
        </optgroup>
        <optgroup label="Select by independent/external school">
          <option value="Independent Schools">Independent Schools</option>
          <option value="External Schools">External Schools</option>
        </optgroup>
        <optgroup label="Select a public school">
        <option v-for="district in districtOptionList.data" v-bind:key="district.school_or_district_id"
                      :value="district.school_or_district_id">{{ district.school_or_district_name }}</option>
        </optgroup>
      </select>
    </div>
    <div class="col-6" v-if="districtOption && districtOption != 'All Schools' && districtOption != 'All Public Schools' && districtOption != 'All External Schools' && districtOption != 'All Independent Schools'">
      <span><strong class="p-1">Select a School</strong></span>
      <select class="form-control" v-model="schoolOption"  @change="search">
        <option  v-for="option in sortedSchools" :value="option.school_or_district_id" :key="option.school_or_district_id">{{option.school_or_district_name}}</option>
      </select>
    </div>  
    </div>
          
      <table class="">
        <tbody>

          <tr>
            <th class="p-1">Year</th>
            <th class="p-1">Gr</th>
            <th class="p-1">Subject</th>
            <th class="p-1">Language</th>
            <th class="p-1">Gender</th>
            <th class="p-1">Francophone</th>
            <th class="p-1">French Immersion</th>
            <th class="p-1">English Language Learners (ELL)</th>
            <th class="p-1">Indigenous</th>
          </tr>
          <tr>

            <td class="p-1" style="width:140px">
              <select v-model="year" class="form-control">
                <option v-for="option in yearOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>

            </td>

            <td class="p-1" style="width:75px">
              <select v-model="grade" class="form-control" @change="search">
                <option v-for="option in gradeOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>
            </td>


            <td class="p-1" style="width:150px">
              <select v-model="subject" class="form-control" @change="search">
                <option v-for="option in subjectOptions" v-bind:value="option.value" v-bind:key="option.text">
                  {{ option.text }}
                </option>
              </select>

            </td>

            <td class="p-1" style="width:100px">
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

          </tr>
          <tr>
            <td class="align-text-right">
              <button class="btn btn-secondary" @click="resetSearch()">Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <div>
      <h2 class="search-filters border-bottom pt-5">
        <span v-if="school">
          {{schoolName}}
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

    <div v-if="loading">
      <b-spinner></b-spinner>
    </div>
    <div id="results" v-if="!loading">
      <div>
        <b-tabs content-class="mt-3">

          <b-tab v-if="aSelectedResponses.length" title="A: SELECTED RESPONSE">
            <template>
              <div>
                <b-table sortBy="item" striped hover :items="this.aSelectedResponses"
                  :fields="aSelectedResponsesFields">
                </b-table>
              </div>
            </template>
          </b-tab>
          <b-tab v-if="!aSelectedResponses.length" title="A: SELECTED RESPONSE">
            <template>
              <div>
                There are no responses for this section. Please view other sections if available, or change your filter
                parameters.
              </div>
            </template>
          </b-tab>
          <b-tab v-if="bConstructedResponses.length" title="B: CONSTRUCTED RESPONSE">
            <b-table striped hover sortBy="theme" :items="this.bConstructedResponses"
              :fields="bConstructedResponsesFields">
                <template v-slot:cell(num_of_score_0)="{ item }">
                  {{item.num_of_score_0}} ({{item.percent_score_0}})
                </template>
                <template v-slot:cell(num_of_score_1)="{ item }">
                  {{item.num_of_score_1}} ({{item.percent_score_1}})
                </template>
                <template v-slot:cell(num_of_score_2)="{ item }">
                  {{item.num_of_score_2}} ({{item.percent_score_2}})
                </template>
                <template v-slot:cell(num_of_score_3)="{ item }">
                  {{item.num_of_score_3}} ({{item.percent_score_3}})
                </template>                                        
                <template v-slot:cell(num_of_score_4)="{ item }">
                  {{item.num_of_score_4}} ({{item.percent_score_4}})
                </template>                                                
            

            </b-table>
          </b-tab>
          <b-tab v-if="!bConstructedResponses.length" title="B: CONSTRUCTED RESPONSE">
            <div>
              There are no responses for this section. Please view other sections if available, or change your filter
              parameters.
            </div>
          </b-tab>
          <b-tab v-if="cCognitiveResponses.length" title="C: COGNITIVE LEVELS">
            <b-table striped hover sort-by="cognitive_level" :items="this.cCognitiveResponses" :fields="fieldsC">
            </b-table>
          </b-tab>
          <b-tab v-if="!cCognitiveResponses.length" title="C: COGNITIVE LEVELS">
            <div>
              There are no responses for this section. Please view other sections if available, or change your filter
              parameters.
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import ResponseService from "@/services/ResponseService.js";
  export default {
    name: 'FSA',
    watch: {
      // whenever question changes, this function will run
      year: function () {
        if(this.year == '2017-2018' || this.year == '2018-2019' || this.year == '2019-2020' || this.year == '2020-2021'){
           
            this.subjectOptions = [{
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
            }
          ]
          this.subject = "Reading"
        
        }else {

          this.subjectOptions = [{
              text: 'Literacy',
              value: 'Literacy'
            },
            {
              text: 'Numeracy',
              value: 'Numeracy'
            }]
            this.subject = "Literacy"
        }
        this.$nextTick(() => {
          this.search();
        });
      },

      districtOption: function () {
    
        if(this.districtOption == 'All Public Schools'){
            this.schoolOption = 'All Public Schools'
            this.search();
        }else if(this.districtOption == 'All External Schools'){
            this.schoolOption = 'All External Schools'
            this.search();
        }else if(this.districtOption == 'All Independent Schools'){
            this.schoolOption = 'All Independent Schools'
            this.search();                    
        }else if(this.districtOption == 'All Schools'){
            this.schoolOption = 'All Schools'
            this.search();
        }else{
          ResponseService.getSchoolOptions(this.districtOption).then(response => (this.schoolList = response));
        }       
      }
    },
    data() {


      
      return {
        districtOption: 'All Public Schools',
        districtOptionList: null,
        schoolOption: 'All Public Schools',
        school: 'All Public Schools',
        schoolList: "",
        searchMessage: "",
        aSelectedResponsesFields: [{
            key: 'content',
            label: 'CONTENT',
            sortable: true,
          }, {
            key: 'item',
            label: 'ITEM #',
            sortable: true,
          },
          {
            key: 'cognitive_level',
            label: 'COGNITIVE LEVEL',
          },
          {
            key: 'number_of_respondents',
            label: 'RESPONDENTS',
            sortable: true,
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
            label: 'CONTENT',
          }, {
            key: 'theme',
            label: 'THEME',
          },
          {
            key: 'item',
            label: 'ITEM #',
          },
          {
            key: 'writers',
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
    
        year: '2022-2023',
        yearOptions: [{
            text: '2017-2018',
            value: '2017-2018'
          },
          {
            text: '2018-2019',
            value: '2018-2019'
          },
          {
            text: '2019-2020',
            value: '2019-2020'
          },
          {
            text: '2020-2021',
            value: '2020-2021'
          },
          {
            text: '2021-2022',
            value: '2021-2022'
          },
          {
            text: '2022-2023',
            value: '2022-2023'
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
        subject: "Literacy",
        subjectOptions: [
          {
            text: 'Literacy',
            value: 'Literacy'
          },
          {
            text: 'Numeracy',
            value: 'Numeracy'
          }
        ],
        examLanguage: "English",
        examLanguageOptions: [{
            text: 'EN',
            value: 'English'
          },
          {
            text: 'FR',
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
            text: 'Francophone',
            value: 'Yes'
          },
          {
            text: 'Non-Francophone',
            value: 'No'
          },
        ],
        frenchImmersion: "all",
        frenchImmersionOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'French Immersion',
            value: 'Yes'
          },
          {
            text: 'Non-French Immersion',
            value: 'No'
          },
        ],
        ell: "all",
        ellOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'ELL',
            value: 'Yes'
          },
          {
            text: 'Non-ELL',
            value: 'No'
          },
        ],
        indigenous: "all",
        indigenousOptions: [{
            text: 'All',
            value: 'all'
          },
          {
            text: 'Indigenous',
            value: 'Yes'
          },
          {
            text: 'Non-indigenous',
            value: 'No'
          },
        ],
        loading: false,
        search2: '',
      }

    },
    created() {
      this.search();

      ResponseService.getDistrictOptions().then(response => (this.districtOptionList = response))
    },
    computed: {
        sortedSchools() {
          if(this.schoolList){
            return this.schoolList.data
              .filter(school => school.school_or_district_name.toLowerCase().match(this.search2.toLowerCase()))
              .sort((a, b) => {
                  if (a.school_or_district_name < b.school_or_district_name)
                      return -1;
                  if (a.school_or_district_name > b.school_or_district_name)
                      return 1;
                  return 0;
            });
          }else return []
        }
    },
    methods: {

      search: function () {

        this.searchMessage = "";
        this.aSelectedResponses = {};
        this.bConstructedResponses = {};
        this.cSelectedResponse = {};
        this.loading = true;
        this.school =  this.schoolOption;
        this.schoolName = "";
        //update the subject if year is 2017 - 2020

        ResponseService.getASelectedResponse(this.school, this.year, this.grade, this.subject, this.examLanguage, this
          .gender, this.francophone, this.frenchImmersion, this.ell, this.indigenous).then((response) => {
            if(response.data.length){
              this.aSelectedResponses = response.data;
              if(this.aSelectedResponses[0].school){
                this.schoolName = this.aSelectedResponses[0].school;
              }else if(this.aSelectedResponses[0].school_or_district){
                this.schoolName = this.aSelectedResponses[0].school_or_district;
              }
            }
            this.loading = false;
          
        })
        
        ResponseService.getBConstructedResponse(this.school, this.year, this.grade, this.subject, this.examLanguage,
          this
          .gender, this.francophone, this.frenchImmersion, this.ell, this.indigenous).then((response) => {
            if(response.data.length){
              this.bConstructedResponses = response.data;
              if(this.bConstructedResponses[0].school){
                this.schoolName = this.bConstructedResponses[0].school;
              }else if(this.bConstructedResponses[0].school_or_district){
                this.schoolName = this.bConstructedResponses[0].school_or_district;
              }
              this.loading = false;
            }
          
        });
        ResponseService.getCCognitiveResponse(this.school, this.year, this.grade, this.subject, this.examLanguage,
          this
          .gender, this.francophone, this.frenchImmersion, this.ell, this.indigenous).then((response) => {
            if(response.data.length){
              this.cCognitiveResponses = response.data;
              if(this.cCognitiveResponses[0].school){
                this.schoolName = this.cCognitiveResponses[0].school_or_district;
              }
            }
            this.loading = false;
        });

        //set the schoolName

        

      },
      resetSearch: function () {
        this.searchMessage = "";
        this.aSelectedResponses = {};
        this.bConstructedResponses = {};
        this.cSelectedResponse = {};
        this.school = "All Public Schools";
        this.districtOption =  'All Public Schools',
        this.school = 'All Public Schools',
        this.year = "2021-2022";
        this.grade = "04";
        this.subject = "Literacy";
        this.examLanguage = "English";
        this.gender = "all";
        this.francophone = "all";
        this.frenchImmersion = "all";
        this.ell = "all";
        this.indigenous = 'all';
        this.saveSelectionAndReset();
        this.schoolName = "";

      },
      clearSchool: function () {
        this.school = "";
      },
      saveSelectionAndReset(e) {
        let val = e;
        if (val) {
          this.school = val;
        }
        e = "";
        this.search();

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2.search-filters span+span::before {
    content: " | "
  }

  h4.header span+span::before {
    content: " | "

  }

  .clear-button {
    float: right;
  }
</style>