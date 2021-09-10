import axios from 'axios';

var apiClient = axios.create({
    baseURL: "",
})


export default {
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
