# Setup of a SAP Business Technology Platform Account using Boosters
## Introduction

For running the Inventory of Management mission you will need the following services in your SAP Business Technology Platform (BTP) account.

* Cloud Foundry Runtime
* SAP HANA Cloud

The entitlement differs for the pricing option of your account:

**Consumption-based SAP BTP Account:**
No entitlement necessary. Be sure that you have enough credits to run the services.

**Subscription-based SAP BTP Account:**
You have to create entitlements for the services above - [see also Entitlements and Quotas](https://help.sap.com/viewer/df50977d8bfa4c9a8a063ddb37113c43/Cloud/en-US/38ecf59cdda64150a102cfaa62d5faab.html#loio363f0f68f9704830ac65c87a2562559b).


[Check the costs with the SAP BTP Estimator Tool](https://www.sap.com/products/business-technology-platform/estimator-tool.html?blueprintId=d3a7926e-61a4-4902-ae00-e952fd883930)


**Booster:**

The setup could be done for each service individually. To simplify the setup process, SAP has introduced Boosters. Boosters are a collection of wizards that provides functionalities for specific scenarios to automate and speed-up the installation and configuration process of a SAP BTP sub-account. This also includes the user management with the mapping of the respective administrator and developer roles.

Before running the booster please check for which regions and infrastructures the services are available - [see SAP BTP Regions and Service Portfolio ](https://help.sap.com/doc/aa1ccd10da6c4337aa737df2ead1855b/Cloud/en-US/3b642f68227b4b1398d2ce1a5351389a.html) - unfortunately the booster is not able to check this in advance, so it will fail when you select a region where a service is not available.


**Persona:** Cloud Administrator (SAP BTP)

**Abbreviation:** SAP Business Technology Platform = SAP BTP

## Step-by-step

### A: Run the Booster

1. Start the Booster
   Login to your global SAP BTP account.
   1. Select Boosters in the SAP BTP Account menu.
   2. Select the Booster "Prepare an Account for Development"

   ![Booster](./images/booster-01.png)

2. Booster Overview

   ![Booster](./images/booster-02.png)

3. Select Components to get an overview of them. Press Start

   ![Booster](./images/booster-03.png)

4. Check Prerequisites. If Ok press Next - otherwise check
   ![Booster](./images/booster-04.png)


5. Setup Subaccount

   You find the list of the services that will acctivated by the Booster. For this mission the **Connectivity** and the **Destination** are not used in this  mission - therefore you can remove them.

   ![Booster](./images/booster-05.png)

   >By using a subscription-based SAP BTP account you have to set the quota of the **Cloud Foundry Runtime** to 3
   ![Booster](./images/booster-05a.png)


    1. In the sub section enter a meaningful Subaccount name - in general it reflects the organisation of your team etc.
    2. Select your Provider
    3. Select the Region
    4. Enter a meaningful Org Name
    5. Enter a space name - this should reflect the name of your project
    6. Press Next   

   ![Booster](./images/booster-06.png)

6. Add User
   1. Enter the User ID (mail address) of all administration users
   2. Enter the User ID (mail address) of all development users
   3. Press Next

   ![Booster](./images/booster-07.png)

7. Review your settings and press Finish

   ![Booster](./images/booster-08.png)

8.  Check the progess - all sections should get green

    ![Booster](./images/booster-09.png)

9. If you succeed navigate to the new Subaccount.

    ![Booster](./images/booster-10.png)

10. Check your subaccount:

    Go to **Instances and Subscriptions** and select the **Subscription** tab - check if the following environment is enabled:
    * Cloud Foundry Runtime

    ![Booster](./images/booster-12.png)

### B: Create a SAP HANA Service Instance

For this mission SAP HANA Cloud for SAP BTP is necessary. Use the following steps for activating it:

1. Select Services - Under your subaccount, select "**Service Marketplace**" and click on the tile '**SAP HANA Cloud**'. If you do not see the 'SAP HANA Cloud' Tile, click 'Entitlements' and click on 'Configure Entitlements and then click 'Add Service Plans' and assign the 'SAP HANA Cloud' service with 'hana' service plan. If you don't have permission to add the entitlement, please contact your administrator.

    ![HANA](./images/hana-01.png)

2. Select **Create**.

    ![HANA](./images/hana-02.png)

3. In the "New Instance" screen select
    * Service = SAP HANA Cloud
    * Service Plan = Hana
    * Runtime Environment = Cloud Foundry
    * Space = the space you have created with the Booster

    click on the link **here** to create a Database first before creating an instance.


    ![HANA](./images/hana-03.png)

4. Click the button 'Create Database'.

    ![HANA](./images/createDatabase.png)


5.  Enter an 'Instance Name','Description' and 'Password'. if everything is correct then the "Step 2" button appear - click on it.

    ![HANA](./images/createDatabase02.png)

6.  Here you can setup the size of the SAP HANA Cloud instance - for the mission you can keep the minimum settings - click on "Step 3"

    ![HANA](./images/hana-06.png)

7.  Keep the Advanced Settings and click on "Create Instance"

    ![HANA](./images/hana-07.png)

8.  After some minutes the HANA instace is created and you should see a similar card.

    ![HANA](./images/hana-08.png)

With that the setup of your SAP BTP account is done.
