package com.nadec.selfservice.bean;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class GradeBean {
    public GradeBean() {
        super();
    }
    private String gradeId;
    private String effectiveStartDate;
    private String effectiveEndDate;
    private String setId;
    private String gradeName;
    private String gradeCode;
    private String activeStatus;
    private String creationDate;
    private String lastUpdateDate;


    public void setGradeId(String gradeId) {
        this.gradeId = gradeId;
    }

    public String getGradeId() {
        return gradeId;
    }

    public void setEffectiveStartDate(String effectiveStartDate) {
        this.effectiveStartDate = effectiveStartDate;
    }

    public String getEffectiveStartDate() {
        return effectiveStartDate;
    }

    public void setEffectiveEndDate(String effectiveEndDate) {
        this.effectiveEndDate = effectiveEndDate;
    }

    public String getEffectiveEndDate() {
        return effectiveEndDate;
    }

    public void setSetId(String setId) {
        this.setId = setId;
    }

    public String getSetId() {
        return setId;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeCode(String gradeCode) {
        this.gradeCode = gradeCode;
    }

    public String getGradeCode() {
        return gradeCode;
    }

    public void setActiveStatus(String activeStatus) {
        this.activeStatus = activeStatus;
    }

    public String getActiveStatus() {
        return activeStatus;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setLastUpdateDate(String lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public String getLastUpdateDate() {
        return lastUpdateDate;
    }
}
