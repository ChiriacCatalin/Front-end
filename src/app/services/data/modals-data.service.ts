import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsDataService {
  jobTypes: string[] = ['Full-time', 'Part-time', 'Internship', 'Contract'];
  experienceLevels: string[] = ['Internship', 'Entry level', 'Mid level', 'Senior level', 'Director', 'Executive'];
  siteRemote: string[] = ['On-Site', 'Remote', 'Hybrid'];

  interviewQuestions: string[] = ['Why would you like to join our company', 'Do you have any prior experience?', 
  'Do you prefer working alone or in a team?', 'Have you worked on a team before?', 'What\'s the largest project you worked on?',
  'What expectations do you have working in our company?', 'How did you come to hear about us?'];
  country: string[] = ['Afghanistan','Albania','Algeria','Andorra','Angola','Anguilla','Antigua and Barbuda','Argentina',
  'Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
  'Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','British Virgin Islands',
  'Brunei','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Cape Verde','Cayman Islands','Chad','Chile','China',
  'Colombia','Congo','Cook Islands','Costa Rica','Cote D Ivoire','Croatia','Cruise Ship','Cuba','Cyprus','Czech Republic',
  'Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Estonia','Ethiopia',
  'Falkland Islands','Faroe Islands','Fiji','Finland','France','French Polynesia','French West Indies','Gabon','Gambia','Georgia',
  'Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guam','Guatemala','Guernsey','Guinea','Guinea Bissau','Guyana',
  'Haiti','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy',
  'Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kuwait','Kyrgyz Republic','Laos','Latvia','Lebanon','Lesotho',
  'Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macau','Macedonia','Madagascar','Malawi','Malaysia','Maldives',
  'Mali','Malta','Mauritania','Mauritius','Mexico','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique',
  'Namibia','Nepal','Netherlands','Netherlands Antilles','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Norway',
  'Oman','Pakistan','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Puerto Rico',
  'Qatar','Reunion','Romania','Russia','Rwanda','Saint Pierre and Miquelon','Samoa','San Marino','Satellite','Saudi Arabia',
  'Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','South Africa','South Korea','Spain',
  'Sri Lanka','St Kitts and Nevis','St Lucia','St Vincent','St. Lucia','Sudan','Suriname','Swaziland','Sweden','Switzerland',
  'Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey',
  'Turkmenistan','Turks and Caicos','Uganda','Ukraine','United Arab Emirates','United Kingdom','Uruguay','Uzbekistan',
  'Venezuela','Vietnam','Virgin Islands (US)','Yemen','Zambia','Zimbabwe'];
  city: string[] = ['Alba', 'Arad', 'Arges', 'Bacau', 'Bihor', 'Bistrita-Nasaud', 'Botosani', 'Braila', 'Brasov', 'Bucuresti',
  'Buzau', 'Calarasi', 'Caras-Severin', 'Cluj', 'Constanta', 'Covasna', 'Dimbovita', 'Dolj', 'Galati', 'Gorj', 'Giurgiu',
  'Harghita', 'Hunedoara', 'Ialomita', 'Iasi', 'Ilfov', 'Maramures', 'Mehedinti', 'Mures', 'Neamt', 'Olt', 'Prahova', 'Salaj',
  'Satu Mare', 'Sibiu', 'Suceava', 'Teleorman', 'Timis', 'Tulcea', 'Vaslui', 'Vilcea', 'Vrancea', 'Berlin', 'Frankfurt',
  'Paris', 'Madrid'];


  constructor() { }

}
