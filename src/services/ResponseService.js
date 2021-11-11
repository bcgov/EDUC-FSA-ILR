import axios from 'axios';

var apiClient = axios.create({
    baseURL: "",
})


export default {
    getSchoolOptions(district){
        return apiClient.get('/fsa-school-districtsID/' + district);
    },
    getDistrictOptions(){
        return apiClient.get('/fsa-school-districts-agg');
    },
    getASelectedResponse(school,year,grade,subject,examLanguage,gender,francophone,frenchImmersion,ell,indigenous) {
        console.log('/selected-response/'     
            + school + "/" 
            + year + "/"
            + grade + "/" 
            + subject + "/" 
            + examLanguage + "/"
            + gender + "/"
            + francophone + "/"
            + frenchImmersion + "/"
            + ell + "/" 
            + indigenous)
        return apiClient.get('/selected-response/'     
        + school + "/" 
        + year + "/"
        + grade + "/" 
        + subject + "/" 
        + examLanguage + "/"
        + gender + "/"
        + francophone + "/"
        + frenchImmersion + "/"
        + ell + "/" 
        + indigenous);
    },
    getBConstructedResponse(school,year,grade,subject,examLanguage,gender,francophone,frenchImmersion,ell,indigenous) {   
        console.log(('/constructed-response/'     
        + school + "/" 
        + year + "/"
        + grade + "/" 
        + subject + "/" 
        + examLanguage + "/"
        + gender + "/"
        + francophone + "/"
        + frenchImmersion + "/"
        + ell + "/" 
        + indigenous));
        return apiClient.get('/constructed-response/'     
            + school + "/" 
            + year + "/"
            + grade + "/" 
            + subject + "/" 
            + examLanguage + "/"
            + gender + "/"
            + francophone + "/"
            + frenchImmersion + "/"
            + ell + "/" 
            + indigenous);
    },
    getCCognitiveResponse(school,year,grade,subject,examLanguage,gender,francophone,frenchImmersion,ell,indigenous) {
        console.log(('/cognitive-levels/'     
            + school + "/" 
            + year + "/"
            + grade + "/" 
            + subject + "/" 
            + examLanguage + "/"
            + gender + "/"
            + francophone + "/"
            + frenchImmersion + "/"
            + ell + "/" 
            + indigenous));
        return apiClient.get('/cognitive-levels/'     
            + school + "/" 
            + year + "/"
            + grade + "/" 
            + subject + "/" 
            + examLanguage + "/"
            + gender + "/"
            + francophone + "/"
            + frenchImmersion + "/"
            + ell + "/" 
            + indigenous);
    }        


}
