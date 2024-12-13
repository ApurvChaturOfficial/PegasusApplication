// import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0 0 0;
  margin: 10px 0 10px 0;
  font-weight: 400;
`;

interface NavItemProps {
  active?: boolean;
}

// const NavItem = styled(Link)<NavItemProps>`

const Navigation = styled(NavLink)<NavItemProps>`
  text-decoration: none;
  color: ${props => props.active ? '#0080FF' : '#242424'};
  padding: 10px 0px 0px 10px;
  margin: 0;
  margin-left: 40px;
  margin-right: 12px;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    color: #007bff;
  }
`;

const HorizontalLine = styled.hr`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const SubNavBar = (props: any) => {
  // Destructure Props
  const { 
    companyTab, setCompanyTab, 
    licenseTab, setLicenseTab, licenseListAPITrigger,
    reminderTab, setReminderTab, 
    inspectionTab, setInspectionTab, 
    documentTab, setDocumentTab, 
    serviceTab, setServiceTab ,

    licenseTabList, setLicenseTabList,
    licenseTabCreate, setLicenseTabCreate,
    licenseTabRetrieve, setLicenseTabRetrieve,
  } = props

  // Event Handlers
  const activateCompany = () => {
    setCompanyTab(true)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabRetrieve(false)
  }

  const activateLicense = () => {
    setCompanyTab(false)
    setLicenseTab(true)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(true)
    setLicenseTabCreate(false)
    setLicenseTabRetrieve(false)

    licenseListAPITrigger()
  }

  const activateReminder = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(true)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabRetrieve(false)
  }

  const activateInspection = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(true)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabRetrieve(false)
  }

  const activateDocument = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(true)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabRetrieve(false)
  }

  const activateService = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(true)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabRetrieve(false)
  }

  // JSX
  return (
    <MainContainer>
      <NavLinks>
        <Navigation to={""} style={{ color: companyTab && '#007bff' }} onClick={() => activateCompany()} >Company</Navigation>
        <Navigation to={""} style={{ color: (licenseTab || licenseTabList || licenseTabCreate || licenseTabRetrieve) && '#007bff' }} onClick={() => activateLicense()} >Licenses</Navigation>
        <Navigation to={""} style={{ color: reminderTab && '#007bff' }} onClick={() => activateReminder()} >Reminders</Navigation>
        <Navigation to={""} style={{ color: inspectionTab && '#007bff' }} onClick={() => activateInspection()} >Inspection Reports</Navigation>
        <Navigation to={""} style={{ color: documentTab && '#007bff' }} onClick={() => activateDocument()} >Documents</Navigation>
        <Navigation to={""} style={{ color: serviceTab && '#007bff' }} onClick={() => activateService()} >Services</Navigation>
      </NavLinks>
      <HorizontalLine />
    </MainContainer>
  );
};

export default SubNavBar;
