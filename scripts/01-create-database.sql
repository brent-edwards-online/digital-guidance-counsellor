DROP DATABASE IF EXISTS DigitalGuidanceCounsellor;
CREATE DATABASE DigitalGuidanceCounsellor;
USE DigitalGuidanceCounsellor;

-- Create Tables
CREATE TABLE PostCode(
	PostCodeId int NOT NULL AUTO_INCREMENT,
    PostCodeValue int NOT NULL,
	Suburb VARCHAR(64), 
    SiteUrl VARCHAR(128), 
    Created DATETIME DEFAULT CURRENT_TIMESTAMP, 
    LastModified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(PostCodeId)
);

/*
DROP TABLE IF EXISTS JobSearchSites;
CREATE TABLE JobSearchSites(
	JobSearchSiteId int NOT NULL AUTO_INCREMENT,
    PostCodeStart int NOT NULL,
    PostCodeEnd int NOT NULL,
	SiteName VARCHAR(64), 
    SiteUrl VARCHAR(128), 
    Created DATETIME DEFAULT CURRENT_TIMESTAMP, 
    LastModified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(JobSearchSiteId)
);
*/

-- Seed Users and Roles
FLUSH PRIVILEGES;
DROP USER IF EXISTS 'dgc_su'@localhost;
CREATE USER 'dgc_su'@localhost IDENTIFIED BY '$t^p}}U67SAcknP^';
GRANT ALL PRIVILEGES ON * . * TO 'dgc_su'@'localhost';

DROP USER IF EXISTS 'dgc_api'@localhost;
CREATE USER 'dgc_api'@'localhost' IDENTIFIED BY 'x,2CUM[Y2}wJW/m~';
