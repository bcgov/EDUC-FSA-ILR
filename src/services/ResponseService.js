import axios from 'axios';

var apiClient = axios.create({
    baseURL: "https://test.studentsuccess.gov.bc.ca",
})


export default {
    getASelectedResponse(school,year,grade,subject,examLanguage,gender,francophone,frenchImmersion,ell,indigenous) {
    console.log('https://test.studentsuccess.gov.bc.ca/selected-response/BC%20PUBLIC%20SCHOOL/'     
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
        return apiClient.get('/selected-response/BC%20PUBLIC%20SCHOOL/'     
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
