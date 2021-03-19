import axios from 'axios';

var apiClient = axios.create({
    baseURL: "https://test.studentsuccess.gov.bc.ca",
})


export default {
    getASelectedResponse(school,year,grade,subject,examLanguage,gender,francophone,frenchImmersion,ell,indigenous) {
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
