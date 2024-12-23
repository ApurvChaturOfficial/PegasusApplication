import path from 'path';
import express from 'express'

import morganMiddleware from 'morgan'
import corsMiddleware from 'cors'
import bodyParserMiddleware from 'body-parser'
import cookieParserMiddleware from 'cookie-parser'
import compressionMiddleware from 'compression'

import errorMiddleware from '../bLove/bMiddleware/aErrorMiddleware'

// import { baseManyToOneRouter } from '../bLove/aMCR/cRoute/aSetting/aBaseManyToOneRoute'
// import { baseManyToManyRouter } from '../bLove/aMCR/cRoute/aSetting/bBaseManyToManyRoute'
// import { baseRouter } from '../bLove/aMCR/cRoute/aSetting/cBaseRoute'
// import { baseOneToOneRouter } from '../bLove/aMCR/cRoute/aSetting/dBaseOneToOneRoute'
// import { baseOneToManyRouter } from '../bLove/aMCR/cRoute/aSetting/eBaseOneToManyRoute'

import { userRouter } from '../bLove/aMCR/cRoute/bUserAdministration/aUserRoute'
import { roleRouter } from '../bLove/aMCR/cRoute/bUserAdministration/bRoleRoute'
import { menuRouter } from '../bLove/aMCR/cRoute/bUserAdministration/cMenuRoute'

import { organizationRouter } from '../bLove/aMCR/cRoute/dPegasusMain/aOrganizationRoute'
import { licenseRouter } from '../bLove/aMCR/cRoute/dPegasusMain/bLicenseRoute'
import { serviceRouter } from '../bLove/aMCR/cRoute/dPegasusMain/cServiceRoute'
import { documentRouter } from '../bLove/aMCR/cRoute/dPegasusMain/dDocumentRoute'
import { inspectionRouter } from '../bLove/aMCR/cRoute/dPegasusMain/eInspectionRoute'
import { enrolledServiceRouter } from '../bLove/aMCR/cRoute/dPegasusMain/fEnrolledServiceRoute'

import { singleImageRouter } from '../bLove/aMCR/cRoute/zFreestyleSample/aSingleImageRoute'


const appConnection = express();

// Third Party Middleware
appConnection.use(morganMiddleware("dev"));
appConnection.use(corsMiddleware({ origin: process.env.ENVIRONMENT === "Production" ?
  [
    "https://pegasus-004.netlify.app",
  ] : 
  [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://13.53.36.212:8080",
  ], credentials: true }));
appConnection.use(bodyParserMiddleware.urlencoded({ extended: true }));
appConnection.use(bodyParserMiddleware.json());
appConnection.use(cookieParserMiddleware());
appConnection.use(compressionMiddleware());

// Connect Frontend (For AWS Deployment)
const buildpath = path.join(__dirname, "../../../frontend/dist")
appConnection.use(express.static(buildpath))

// Routing Middleware
appConnection.use("/api/v1/user/", userRouter);
appConnection.use("/api/v1/role/", roleRouter);
appConnection.use("/api/v1/menu/", menuRouter);

appConnection.use("/api/v1/organization/", organizationRouter);
appConnection.use("/api/v1/license/", licenseRouter);
appConnection.use("/api/v1/service/", serviceRouter);
appConnection.use("/api/v1/document/", documentRouter);
appConnection.use("/api/v1/inspection/", inspectionRouter);
appConnection.use("/api/v1/enrolled-service/", enrolledServiceRouter);

appConnection.use('/api/v1/single-image/', singleImageRouter);

// Error Middleware
appConnection.use(errorMiddleware);

export default appConnection;
