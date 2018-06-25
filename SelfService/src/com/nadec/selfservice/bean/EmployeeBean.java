package com.nadec.selfservice.bean;

import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement
public class EmployeeBean {
    public EmployeeBean() {
        super();
    }
    
    private String displayName;
    
    private String citizenshipLegislationCode;
    
    private String personNumber;
    
    private String personId;
    
    private String hireDate;
    
    private String assignmentName;
    
    private String assignmentCategory;
    
    private String managerType;
    
    private Long salaryAmount;
    
    private String department;
    
    private String grade;
    
    private String managerId;
    
    private String country;
    
    private String city;
    
    private String region;
    
    private String gradeId;
    
    private String managerName;
    
    private String employeeLocation;

    private String jobId;
    
    private String positionName;
    
    private String positionId;
    
    private String departmentName;
    
    private String picBase64;
    
    private String nationalId;
    private String managerOfManager;
    private String housingType;
    private String carAllowance;
    private String mobileAllowance;
    private String transportationAlowance;
    private String projectedStartDate;
    private String assignmentProjectedEndDate;
    private String managerOfMnagerName ; 
    
    private String probationPeriodEndDate;
    private String dateOfBirth;
    
    private String peopleGroup;
    private String jobName;
    private String maritalStatus;
    
    private String assignmentStatusTypeId;
    private String assignmentStatus;
    private String email;
    
    private String mobileNumber;
    private String workPhone;
    private String workPhoneExt;
    private String fax;
    private String faxExt;
    private String legalEntityId;
    
    private String organizationName;
    private String businessUnitName;
  
    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }
    public String getOrganizationName(){
        return this.organizationName;
    }
    public void setLegalEntityId(String legalEntityId) {
        this.legalEntityId = legalEntityId;
    }
    public String getLegalEntityId(){
        return this.legalEntityId;
    }
  
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public String getMobileNumber(){
        return this.mobileNumber;
    }
    public void setWorkPhone(String workPhone) {
        this.workPhone = workPhone;
    }
    public String getworkPhone(){
        return this.workPhone;
    }
    public void setWorkPhoneExt(String workPhoneExt) {
        this.workPhoneExt = workPhoneExt;
    }
    public String getWorkPhoneExt(){
        return this.workPhoneExt;
    }
    public void setFax(String fax) {
        this.fax = fax;
    }
    public String getFax(){
        return this.fax;
    }
    public void setFaxExt(String faxExt) {
        this.email = faxExt;
    }
    public String getFaxExt(){
        return this.faxExt;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail(){
        return this.email;
    }
    
    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    public String getDateOfBirth(){
        return this.dateOfBirth;
    }
    
    public void setprojectedStartDate(String projectedStartDate) {
        this.projectedStartDate = projectedStartDate;
    }
    public String getProjectedStartDate(){
        return this.projectedStartDate;
    }
    
    public void setAssignmentProjectedEndDate(String assignmentProjectedEndDate) {
        this.assignmentProjectedEndDate = assignmentProjectedEndDate;
    }
    public String getAssignmentProjectedEndDate(){
        return this.assignmentProjectedEndDate;
    }
    
    public void setManagerOfManager(String managerOfManager) {
        this.managerOfManager = managerOfManager;
    }
    public String getManagerOfManager(){
        return this.managerOfManager;
    }
    public void setManagerOfMnagerName(String managerOfMnagerName) {
        this.managerOfMnagerName = managerOfMnagerName;
    }
    public String getManagerOfMnagerName(){
        return this.managerOfMnagerName;
    }
    
    
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setCitizenshipLegislationCode(String citizenshipLegislationCode) {
        this.citizenshipLegislationCode = citizenshipLegislationCode;
    }

    public String getCitizenshipLegislationCode() {
        return citizenshipLegislationCode;
    }

    public void setPersonNumber(String personNumber) {
        this.personNumber = personNumber;
    }

    public String getPersonNumber() {
        return personNumber;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    public String getPersonId() {
        return personId;
    }

    public void setHireDate(String hireDate) {
        this.hireDate = hireDate;
    }

    public String getHireDate() {
        return hireDate;
    }

    public void setAssignmentName(String assignmentName) {
        this.assignmentName = assignmentName;
    }

    public String getAssignmentName() {
        return assignmentName;
    }

    public void setAssignmentCategory(String assignmentCategory) {
        this.assignmentCategory = assignmentCategory;
    }

    public String getAssignmentCategory() {
        return assignmentCategory;
    }

    public void setManagerType(String managerType) {
        this.managerType = managerType;
    }

    public String getManagerType() {
        return managerType;
    }

    public void setSalaryAmount(Long salaryAmount) {
        this.salaryAmount = salaryAmount;
    }

    public Long getSalaryAmount() {
        return salaryAmount;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getGrade() {
        return grade;
    }

    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }

    public String getManagerId() {
        return managerId;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountry() {
        return country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return city;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getRegion() {
        return region;
    }

    public void setGradeId(String gradeId) {
        this.gradeId = gradeId;
    }

    public String getGradeId() {
        return gradeId;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setEmployeeLocation(String employeeLocation) {
        this.employeeLocation = employeeLocation;
    }

    public String getEmployeeLocation() {
        return employeeLocation;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getJobId() {
        return jobId;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setPicBase64(String picBase64) {
        this.picBase64 = picBase64;
    }

    public String getPicBase64() {
        return picBase64;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setHousingType(String housingType) {
        this.housingType = housingType;
    }

    public String getHousingType() {
        return housingType;
    }

    public void setProbationPeriodEndDate(String probationPeriodEndDate) {
        this.probationPeriodEndDate = probationPeriodEndDate;
    }

    public String getProbationPeriodEndDate() {
        return probationPeriodEndDate;
    }

    public void setCarAllowance(String carAllowance) {
        this.carAllowance = carAllowance;
    }

    public String getCarAllowance() {
        return carAllowance;
    }

    public void setMobileAllowance(String mobileAllowance) {
        this.mobileAllowance = mobileAllowance;
    }

    public String getMobileAllowance() {
        return mobileAllowance;
    }

    public void setTransportationAlowance(String transportationAlowance) {
        this.transportationAlowance = transportationAlowance;
    }

    public String getTransportationAlowance() {
        return transportationAlowance;
    }

    public void setPeopleGroup(String peopleGroup) {
        this.peopleGroup = peopleGroup;
    }

    public String getPeopleGroup() {
        return peopleGroup;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getJobName() {
        return jobName;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setAssignmentStatusTypeId(String assignmentStatusTypeId) {
        this.assignmentStatusTypeId = assignmentStatusTypeId;
    }

    public String getAssignmentStatusTypeId() {
        return assignmentStatusTypeId;
    }

    public void setAssignmentStatus(String assignmentStatus) {
        this.assignmentStatus = assignmentStatus;
    }

    public String getAssignmentStatus() {
        return assignmentStatus;
    }

    public void setBusinessUnitName(String businessUnitName) {
        this.businessUnitName = businessUnitName;
    }

    public String getBusinessUnitName() {
        return businessUnitName;
    }
}
