-- Insert sample data into the Role table (if not already present)
INSERT INTO Role (RoleID, RoleName, Description) VALUES
(1, 'Admin', 'Administrator with full system access'),
(2, 'Customer', 'User who rents/Buy properties'),
(3, 'Seller', 'User who lists properties for rent/sale');

INSERT INTO User (UserID, pass_word, 'NO', '', NULL, ''
, first_name, last_name, birthday, phone, email, createDate, ImgPath, RoleID) VALUES
(1, 'securepass123', 'John', 'Doe', '1985-03-15', '123-456-7890', 'john.doe@example.com', '2023-01-01 10:00:00', '/images/john_doe.jpg', 3); -- RoleID 3 for 'Owner'

-- User 2: A tenant
INSERT INTO User (UserID, pass_word, 'varchar(255)', 'NO', '', NULL, ''
, first_name, last_name, birthday, phone, email, createDate, ImgPath, RoleID) VALUES
(2, 'anothersecurepass', 'Jane', 'Smith', '1990-07-22', '098-765-4321', 'jane.smith@example.com', '2023-01-05 11:30:00', '/images/jane_smith.jpg', 2); -- RoleID 2 for 'Tenant'

select *from User
SELECT * FROM User WHERE email = 'john.doe@example.com';

select u1_0.userid,u1_0.birthday,u1_0.created_art,u1_0.email,u1_0.first_name,u1_0.last_name,u1_0.pass_word,u1_0.phone,u1_0.roleid from `user` u1_0 where u1_0.email='john.doe@example.com'
pass_word

SELECT * FROM realestate.property;
CREATE TABLE property_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (property_id) REFERENCES property(propertyID) ON DELETE CASCADE
);

INSERT INTO property_images (property_id, image_url)
VALUES
(1, '/images/house1_img1.jpg'),
(1, '/images/house1_img2.jpg'),
(1, '/images/house1_img3.jpg'),
(1, '/images/house1_img4.jpg'),
(1, '/images/house1_img5.jpg'),
(1, '/images/house1_img6.jpg');


INSERT INTO property_images (property_id, image_url)
VALUES
(2, '/images/house2_img1.jpg'),
(2, '/images/house2_img2.jpg'),
(2, '/images/house2_img3.jpg'),
(2, '/images/house2_img4.jpg'),
(2, '/images/house2_img5.jpg'),
(2, '/images/house2_img6.jpg');


INSERT INTO property_images (property_id, image_url)
VALUES
(3, '/images/house3_img1.jpg'),
(3, '/images/house3_img2.jpg'),
(3, '/images/house3_img3.jpg'),
(3, '/images/house3_img4.jpg'),
(3, '/images/house3_img5.jpg'),
(3, '/images/house3_img6.jpg');


INSERT INTO property_images (property_id, image_url)
VALUES
(4, '/images/house4_img1.jpg'),
(4, '/images/house4_img2.jpg'),
(4, '/images/house4_img3.jpg'),
(4, '/images/house4_img4.jpg'),
(4, '/images/house4_img5.jpg'),
(4, '/images/house4_img6.jpg');


INSERT INTO property_images (property_id, image_url)
VALUES
(5, '/images/house5_img1.jpg'),
(5, '/images/house5_img2.jpg'),
(5, '/images/house5_img3.jpg'),
(5, '/images/house5_img4.jpg'),
(5, '/images/house5_img5.jpg'),
(5, '/images/house5_img6.jpg');


INSERT INTO property_images (property_id, image_url)
VALUES
(6, '/images/house6_img1.jpg'),
(6, '/images/house6_img2.jpg'),
(6, '/images/house6_img3.jpg'),
(6, '/images/house6_img4.jpg'),
(6, '/images/house6_img5.jpg'),
(6, '/images/house6_img6.jpg');
SELECT * FROM realestate.property_images;
SELECT * FROM realestate.property;
SELECT * FROM realestate.listing;
ALTER TABLE Listing
DROP COLUMN Listing_type,
DROP COLUMN Price,
DROP COLUMN Img_url,
DROP COLUMN UserID;
SELECT * FROM realestate.listing;
SHOW COLUMNS FROM Listing;
ALTER TABLE Listing
DROP COLUMN Listing_type,
DROP COLUMN Price,
DROP COLUMN Img_url,
DROP COLUMN UserID;
ALTER TABLE Listing
DROP FOREIGN KEY fk_listing_user;
ALTER TABLE Listing
DROP COLUMN Listing_type,
DROP COLUMN Price,
DROP COLUMN Img_url,
DROP COLUMN UserID;
SHOW COLUMNS FROM Listing;
ALTER TABLE Listing
MODIFY COLUMN Description TEXT;
SHOW COLUMNS FROM Listing;
-- PropertyID = 1
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
1,
'● MLandmark Residences là biểu tượng mới bên sông Hàn, tọa lạc tại số 58 Bạch Đằng, quận Hải Châu – vị trí trung tâm hành chính, kinh tế và giải trí của thành phố Đà Nẵng.
● Dự án sở hữu vị trí đắc địa, cách cầu quay sông Hàn chỉ vài bước chân, đối diện bờ Tây sông với tầm nhìn vĩnh viễn toàn cảnh thành phố.
● Quy mô dự án gồm tòa tháp cao 45 tầng, 5 tầng hầm, tích hợp căn hộ cao cấp, khách sạn Marriott 5 sao, trung tâm thương mại, nhà hàng, sky bar và các tiện ích nội khu hiện đại.
● Căn hộ được thiết kế tối ưu ánh sáng, thông gió, nội thất bàn giao chuẩn quốc tế, diện tích đa dạng từ 41m² đến 84m² (Studio, 1PN, 2PN).
● Hệ thống an ninh đa lớp, dịch vụ vận hành chuyên nghiệp, thang máy tốc độ cao, hầm gửi xe rộng rãi.
● Sở hữu lâu dài, đã có sổ hồng riêng từng căn, pháp lý minh bạch.
● Tiềm năng đầu tư sinh lời cao nhờ vị trí đắt giá bậc nhất thành phố, phù hợp để ở, nghỉ dưỡng, hoặc cho thuê dài hạn và ngắn hạn.',
NULL, 1);

-- PropertyID = 2
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
2,
'● Sun Costa Residence nằm trên đường Vương Thừa Vũ, phường Phước Mỹ, quận Sơn Trà – một trong những vị trí vàng của du lịch biển Đà Nẵng, chỉ cách bãi biển Mỹ Khê chưa đầy 200m.
● Căn hộ studio và 1 phòng ngủ có diện tích từ 31m² – 40m², phù hợp nhu cầu ở một mình, cặp đôi hoặc đầu tư cho thuê.
● Dự án được phát triển bởi Sun Group – tập đoàn hàng đầu về bất động sản nghỉ dưỡng, bảo chứng cho chất lượng thi công và tiềm năng tăng giá.
● Tiện ích nội khu đẳng cấp: hồ bơi tràn, gym, spa, phòng sinh hoạt cộng đồng, khu BBQ ngoài trời, công viên cây xanh, hệ thống bảo vệ 24/7.
● Từ dự án có thể dễ dàng kết nối đến cầu Rồng, phố Tây An Thượng, sân bay quốc tế Đà Nẵng, chợ Hàn.
● Pháp lý hoàn chỉnh, sổ hồng sở hữu lâu dài, bàn giao đúng tiến độ.
● Rất phù hợp để nghỉ dưỡng ven biển hoặc đầu tư Airbnb, booking, nhờ vị trí gần khu khách sạn và tuyến du lịch quốc tế.',
NULL, 2);

-- PropertyID = 3
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
3,
'● Căn hộ Condotel cao cấp tọa lạc tại số Nguyễn Thị Minh Khai – trung tâm phường Thạch Thang, quận Hải Châu, nơi sầm uất bậc nhất Đà Nẵng.
● Căn hộ có diện tích 68m², thiết kế hiện đại, trần cao, cửa kính lớn đón ánh sáng tự nhiên và gió biển.
● Trang bị đầy đủ nội thất chuẩn khách sạn: giường, tủ, sofa, máy lạnh, tủ lạnh, TV, máy giặt… chỉ cần vào ở hoặc cho thuê ngay.
● Gần các tiện ích trọng điểm: chợ Hàn, cầu Rồng, sông Hàn, trường học, bệnh viện.
● Khu vực an ninh tốt, dân cư văn minh, thích hợp an cư hoặc đầu tư căn hộ du lịch với tỷ lệ lấp đầy cao quanh năm.
● Pháp lý rõ ràng, đã có sổ hồng riêng. Hỗ trợ ngân hàng nếu cần.
● Căn hộ được vận hành chuyên nghiệp, có thể sử dụng cho thuê ngắn hạn hoặc khai thác dịch vụ nghỉ dưỡng cao cấp.',
NULL, 3);

-- PropertyID = 4
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
4,
'● Nhà mặt tiền đường Man Thiện – tuyến phố kết nối trục Nguyễn Hữu Thọ với khu dân cư đông đúc phường Hòa Thuận Tây, quận Hải Châu.
● Diện tích đất 97m², mặt tiền rộng thoáng, dễ cải tạo hoặc xây dựng thêm tầng theo nhu cầu.
● Hiện trạng nhà 1 trệt 1 lầu, kết cấu chắc chắn, có sân để xe, khu bếp riêng, phòng khách thoáng đãng.
● Thích hợp làm showroom, văn phòng đại diện, trung tâm đào tạo, hoặc mở spa, cửa hàng thời trang, tiệm vàng.
● Giao thông thuận tiện: chỉ 5 phút đến sân bay, 7 phút tới cầu Rồng, gần siêu thị, trường học các cấp.
● Khu vực đông đúc, giá trị thương mại cao, sổ đỏ chính chủ.
● Có thể chuyển nhượng ngay, hỗ trợ quy hoạch, pháp lý đầy đủ.',
NULL, 4);

-- PropertyID = 5
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
5,
'● Tòa căn hộ mini 6 tầng tại Lê Văn Thứ, phường Mân Thái, Sơn Trà – nằm ngay trung tâm khu du lịch biển Đà Nẵng.
● Diện tích đất 103.6m², xây dựng hoàn chỉnh, đã chia thành các căn hộ nhỏ khép kín – phù hợp vận hành căn hộ dịch vụ.
● Mỗi tầng gồm 2 căn, có thang máy riêng, sân thượng rộng, máy giặt chung, bếp công cộng, hệ thống camera an ninh.
● Chỉ cách bãi biển Phạm Văn Đồng 3 phút đi bộ, gần công viên Biển Đông, khách sạn quốc tế, phố Tây An Thượng.
● Khai thác ngay với dòng tiền ổn định hoặc phát triển thành homestay, khách sạn mini.
● Pháp lý rõ ràng: sổ hồng, đất thổ cư lâu dài, đã nghiệm thu xây dựng.
● Tiềm năng tăng giá tốt trong bối cảnh phát triển du lịch toàn khu vực.',
NULL, 5);

-- PropertyID = 6
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
6,
'● Nhà mặt phố Lê Lợi – tuyến đường trung tâm phường Thạch Thang, quận Hải Châu, chỉ cách sông Hàn vài phút đi bộ.
● Diện tích đất 85.1m², mặt tiền rộng, vị trí đẹp thích hợp mở showroom, ngân hàng, phòng giao dịch hoặc kinh doanh dịch vụ cao cấp.
● Kết cấu 1 trệt 1 lầu, có thể cải tạo hoặc xây dựng thêm theo quy hoạch đô thị.
● Gần các công trình trọng điểm như UBND TP Đà Nẵng, nhà hát Trưng Vương, trung tâm hành chính.
● Khu dân cư yên tĩnh, an ninh cao, giao thông 2 chiều thuận tiện.
● Pháp lý đầy đủ, sổ đỏ chính chủ, sang tên nhanh gọn.
● Vị trí và diện tích phù hợp với nhu cầu ở kết hợp kinh doanh hoặc đầu tư dài hạn.',
NULL, 6);
SELECT * FROM Listing;
SELECT * FROM realestate.property;
ALTER TABLE Property
DROP COLUMN land_type,
DROP COLUMN legal_status,
DROP COLUMN num_carspaces,
DROP COLUMN private_pool,
DROP COLUMN property_type;



ALTER TABLE Property DROP COLUMN land_type;
ALTER TABLE Property DROP COLUMN legal_status;
ALTER TABLE Property DROP COLUMN private_pool;
ALTER TABLE Property DROP COLUMN property_type;
-- KHÔNG drop num_carspaces nữa vì đã mất rồi.

SELECT * FROM realestate.property;
INSERT INTO property (propertyID, addressLine1, addressLine2, region, city, area, interior, propertyType, numBedroom, numCompares, numBathroom, floor, privatePool, landType, legalStatus, imgURL, purpose, price)
VALUES
(1, 'No. 58 Bach Dang', 'Hai Chau 1 Ward', 'Hai Chau', 'Da Nang', 55, 55, 'Apartment', 1, 0, 1, 30, 0, 'Condominium', 'Ownership certificate', '/image1.jpg', 'rent', '8 million/month'),

(2, 'Vuong Thua Vu', 'Phuoc My Ward', 'Son Tra', 'Da Nang', 35, 35, 'Studio Apartment', 1, 0, 1, 12, 0, 'Condominium', 'Red/Ownership certificate', '/image2.jpg', 'rent', '25 million/month'),

(3, 'Nguyen Thi Minh Khai', 'Thach Thang Ward', 'Hai Chau', 'Da Nang', 68, 68, 'Condotel', 2, 0, 2, 15, 0, 'Condominium', 'Red/Ownership certificate', '/image3.jpg', 'rent', '2.8 billion VND'),

(4, 'Man Thien Street', 'Hoa Thuan Tay Ward', 'Hai Chau', 'Da Nang', 97, 97, 'Street-front House', 3, 1, 3, 3, 0, 'Residential Land', 'Red/Ownership certificate', '/image4.jpg', 'buy', '3.5 billion VND'),

(5, 'Le Van Thu Street', 'Man Thai Ward', 'Son Tra', 'Da Nang', 103.6, 103.6, 'Apartment Building', 12, 1, 6, 6, 0, 'Residential Land', 'Red/Ownership certificate', '/image5.jpg', 'buy', '6.2 billion VND'),

(6, 'Le Loi Street', 'Thach Thang Ward', 'Hai Chau', 'Da Nang', 85.1, 85.1, 'Street-front House', 3, 1, 3, 3, 0, 'Residential Land', 'Ownership available', '/image6.jpg', 'buy', '4.5 billion VND');
INSERT INTO property (
  PropertyID, Address_Line1, Address_Line2, Region, City,
  area, interior, PropertyType, Num_Bedroom, Num_Compares,
  Num_Bathroom, Floor, PrivatePool, LandType, LegalStatus,
  ImgURL, Purpose, Price
) VALUES
(1, '58 Bach Dang Street', 'Hai Chau 1 Ward', 'Hai Chau', 'Da Nang', 55, 55, 'Apartment', 1, 0, 1, 30, 0, 'Condo', 'Red book available', '/image1.jpg', 'rent', '8 million/month'),
(2, 'Vuong Thua Vu', 'Phuoc My', 'Son Tra', 'Da Nang', 35, 35, 'Studio Apartment', 1, 0, 1, 12, 0, 'Condo', 'Red/ Pink book', '/image2.jpg', 'rent', '25 million/month'),
(3, 'Nguyen Thi Minh Khai', 'Thach Thang Ward', 'Hai Chau', 'Da Nang', 68, 68, 'Condotel', 2, 0, 2, 15, 0, 'Condo', 'Red/ Pink book', '/image3.jpg', 'rent', '2.8 billion VND'),
(4, 'Man Thien Street', 'Hoa Thuan Tay Ward', 'Hai Chau', 'Da Nang', 97, 97, 'Townhouse', 3, 1, 3, 3, 0, 'Residential land', 'Red/ Pink book', '/image4.jpg', 'buy', '3.5 billion VND'),
(5, 'Le Van Thu Street', 'Man Thai Ward', 'Son Tra', 'Da Nang', 103.6, 103.6, 'Apartment Tower', 12, 1, 6, 6, 0, 'Residential land', 'Red/ Pink book', '/image5.jpg', 'buy', '6.2 billion VND'),
(6, 'Le Loi Street', 'Thach Thang Ward', 'Hai Chau', 'Da Nang', 85.1, 85.1, 'Townhouse', 3, 1, 3, 3, 0, 'Residential land', 'Red book only', '/image6.jpg', 'buy', '4.5 billion VND');
DELETE FROM property WHERE PropertyID IN (1, 2, 3, 4, 5, 6);
DELETE FROM listing WHERE PropertyID IN (1, 2, 3, 4, 5, 6);
DELETE FROM property WHERE PropertyID IN (1, 2, 3, 4, 5, 6);
INSERT INTO property (
  PropertyID, Address_Line1, Address_Line2, Region, City,
  area, interior, PropertyType, Num_Bedroom, Num_Compares,
  Num_Bathroom, Floor, PrivatePool, LandType, LegalStatus,
  ImgURL, Purpose, Price
) VALUES
(1, '58 Bach Dang Street', 'Hai Chau 1 Ward', 'Hai Chau', 'Da Nang', 55, 55, 'Apartment', 1, 0, 1, 30, 0, 'Condo', 'Red book available', '/image1.jpg', 'rent', '8 million/month'),
(2, 'Vuong Thua Vu Street', 'Phuoc My Ward', 'Son Tra', 'Da Nang', 35, 35, 'Studio Apartment', 1, 0, 1, 12, 0, 'Condo', 'Red book / pink book', '/image2.jpg', 'rent', '25 million/month'),
(3, 'Nguyen Thi Minh Khai Street', 'Thach Thang Ward', 'Hai Chau', 'Da Nang', 68, 68, 'Condotel', 2, 0, 2, 15, 0, 'Condo', 'Red book / pink book', '/image3.jpg', 'rent', '2.8 billion VND'),
(4, 'Man Thien Street', 'Hoa Thuan Tay Ward', 'Hai Chau', 'Da Nang', 97, 97, 'Townhouse', 3, 1, 3, 3, 0, 'Residential land', 'Red book / pink book', '/image4.jpg', 'buy', '3.5 billion VND'),
(5, 'Le Van Thu Street', 'Man Thai Ward', 'Son Tra', 'Da Nang', 103.6, 103.6, 'Apartment Complex', 12, 1, 6, 6, 0, 'Residential land', 'Red book / pink book', '/image5.jpg', 'buy', '6.2 billion VND'),
(6, 'Le Loi Street', 'Thach Thang Ward', 'Hai Chau', 'Da Nang', 85.1, 85.1, 'Townhouse', 3, 1, 3, 3, 0, 'Residential land', 'Red book available', '/image6.jpg', 'buy', '4.5 billion VND');
SELECT * FROM realestate.property;
-- 1. Red book / pink book => Legal title available
UPDATE Property
SET LegalStatus = 'Legal title available'
WHERE LegalStatus LIKE '%Red book%' AND LegalStatus LIKE '%Pink book%';

SET SQL_SAFE_UPDATES = 0;
SELECT * FROM Property
WHERE LegalStatus LIKE '%Red book%' AND LegalStatus LIKE '%Pink book%';
-- 1. Red book / pink book => Legal title available
UPDATE Property
SET LegalStatus = 'Legal title available'
WHERE LegalStatus LIKE '%Red book%' AND LegalStatus LIKE '%Pink book%';

-- 2. Red book => Land Use Certificate (chỉ nếu không chứa pink book)
UPDATE Property
SET LegalStatus = 'Land Use Certificate'
WHERE LegalStatus LIKE '%Red book%' AND LegalStatus NOT LIKE '%Pink book%';

-- 3. Pink book => Ownership Certificate (chỉ nếu không chứa red book)
UPDATE Property
SET LegalStatus = 'Ownership Certificate'
WHERE LegalStatus LIKE '%Pink book%' AND LegalStatus NOT LIKE '%Red book%';
SELECT * FROM realestate.property;
SELECT * FROM realestate.listing;
ALTER TABLE Listing
DROP COLUMN Listing_type,
DROP COLUMN Price,
DROP COLUMN Img_url,
DROP COLUMN UserID;
SELECT * FROM realestate.listing;
SHOW COLUMNS FROM Listing;
ALTER TABLE Listing
DROP COLUMN Listing_type,
DROP COLUMN Price,
DROP COLUMN Img_url,
DROP COLUMN UserID;
ALTER TABLE Listing
DROP FOREIGN KEY fk_listing_user;
ALTER TABLE Listing
DROP COLUMN Listing_type,
DROP COLUMN Price,
DROP COLUMN Img_url,
DROP COLUMN UserID;
SHOW COLUMNS FROM Listing;
ALTER TABLE Listing
MODIFY COLUMN Description TEXT;
SHOW COLUMNS FROM Listing;
-- PropertyID = 1
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
1,
'● MLandmark Residences là biểu tượng mới bên sông Hàn, tọa lạc tại số 58 Bạch Đằng, quận Hải Châu – vị trí trung tâm hành chính, kinh tế và giải trí của thành phố Đà Nẵng.
● Dự án sở hữu vị trí đắc địa, cách cầu quay sông Hàn chỉ vài bước chân, đối diện bờ Tây sông với tầm nhìn vĩnh viễn toàn cảnh thành phố.
● Quy mô dự án gồm tòa tháp cao 45 tầng, 5 tầng hầm, tích hợp căn hộ cao cấp, khách sạn Marriott 5 sao, trung tâm thương mại, nhà hàng, sky bar và các tiện ích nội khu hiện đại.
● Căn hộ được thiết kế tối ưu ánh sáng, thông gió, nội thất bàn giao chuẩn quốc tế, diện tích đa dạng từ 41m² đến 84m² (Studio, 1PN, 2PN).
● Hệ thống an ninh đa lớp, dịch vụ vận hành chuyên nghiệp, thang máy tốc độ cao, hầm gửi xe rộng rãi.
● Sở hữu lâu dài, đã có sổ hồng riêng từng căn, pháp lý minh bạch.
● Tiềm năng đầu tư sinh lời cao nhờ vị trí đắt giá bậc nhất thành phố, phù hợp để ở, nghỉ dưỡng, hoặc cho thuê dài hạn và ngắn hạn.',
NULL, 1);

-- PropertyID = 2
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
2,
'● Sun Costa Residence nằm trên đường Vương Thừa Vũ, phường Phước Mỹ, quận Sơn Trà – một trong những vị trí vàng của du lịch biển Đà Nẵng, chỉ cách bãi biển Mỹ Khê chưa đầy 200m.
● Căn hộ studio và 1 phòng ngủ có diện tích từ 31m² – 40m², phù hợp nhu cầu ở một mình, cặp đôi hoặc đầu tư cho thuê.
● Dự án được phát triển bởi Sun Group – tập đoàn hàng đầu về bất động sản nghỉ dưỡng, bảo chứng cho chất lượng thi công và tiềm năng tăng giá.
● Tiện ích nội khu đẳng cấp: hồ bơi tràn, gym, spa, phòng sinh hoạt cộng đồng, khu BBQ ngoài trời, công viên cây xanh, hệ thống bảo vệ 24/7.
● Từ dự án có thể dễ dàng kết nối đến cầu Rồng, phố Tây An Thượng, sân bay quốc tế Đà Nẵng, chợ Hàn.
● Pháp lý hoàn chỉnh, sổ hồng sở hữu lâu dài, bàn giao đúng tiến độ.
● Rất phù hợp để nghỉ dưỡng ven biển hoặc đầu tư Airbnb, booking, nhờ vị trí gần khu khách sạn và tuyến du lịch quốc tế.',
NULL, 2);

-- PropertyID = 3
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
3,
'● Căn hộ Condotel cao cấp tọa lạc tại số Nguyễn Thị Minh Khai – trung tâm phường Thạch Thang, quận Hải Châu, nơi sầm uất bậc nhất Đà Nẵng.
● Căn hộ có diện tích 68m², thiết kế hiện đại, trần cao, cửa kính lớn đón ánh sáng tự nhiên và gió biển.
● Trang bị đầy đủ nội thất chuẩn khách sạn: giường, tủ, sofa, máy lạnh, tủ lạnh, TV, máy giặt… chỉ cần vào ở hoặc cho thuê ngay.
● Gần các tiện ích trọng điểm: chợ Hàn, cầu Rồng, sông Hàn, trường học, bệnh viện.
● Khu vực an ninh tốt, dân cư văn minh, thích hợp an cư hoặc đầu tư căn hộ du lịch với tỷ lệ lấp đầy cao quanh năm.
● Pháp lý rõ ràng, đã có sổ hồng riêng. Hỗ trợ ngân hàng nếu cần.
● Căn hộ được vận hành chuyên nghiệp, có thể sử dụng cho thuê ngắn hạn hoặc khai thác dịch vụ nghỉ dưỡng cao cấp.',
NULL, 3);

-- PropertyID = 4
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
4,
'● Nhà mặt tiền đường Man Thiện – tuyến phố kết nối trục Nguyễn Hữu Thọ với khu dân cư đông đúc phường Hòa Thuận Tây, quận Hải Châu.
● Diện tích đất 97m², mặt tiền rộng thoáng, dễ cải tạo hoặc xây dựng thêm tầng theo nhu cầu.
● Hiện trạng nhà 1 trệt 1 lầu, kết cấu chắc chắn, có sân để xe, khu bếp riêng, phòng khách thoáng đãng.
● Thích hợp làm showroom, văn phòng đại diện, trung tâm đào tạo, hoặc mở spa, cửa hàng thời trang, tiệm vàng.
● Giao thông thuận tiện: chỉ 5 phút đến sân bay, 7 phút tới cầu Rồng, gần siêu thị, trường học các cấp.
● Khu vực đông đúc, giá trị thương mại cao, sổ đỏ chính chủ.
● Có thể chuyển nhượng ngay, hỗ trợ quy hoạch, pháp lý đầy đủ.',
NULL, 4);

-- PropertyID = 5
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
5,
'● Tòa căn hộ mini 6 tầng tại Lê Văn Thứ, phường Mân Thái, Sơn Trà – nằm ngay trung tâm khu du lịch biển Đà Nẵng.
● Diện tích đất 103.6m², xây dựng hoàn chỉnh, đã chia thành các căn hộ nhỏ khép kín – phù hợp vận hành căn hộ dịch vụ.
● Mỗi tầng gồm 2 căn, có thang máy riêng, sân thượng rộng, máy giặt chung, bếp công cộng, hệ thống camera an ninh.
● Chỉ cách bãi biển Phạm Văn Đồng 3 phút đi bộ, gần công viên Biển Đông, khách sạn quốc tế, phố Tây An Thượng.
● Khai thác ngay với dòng tiền ổn định hoặc phát triển thành homestay, khách sạn mini.
● Pháp lý rõ ràng: sổ hồng, đất thổ cư lâu dài, đã nghiệm thu xây dựng.
● Tiềm năng tăng giá tốt trong bối cảnh phát triển du lịch toàn khu vực.',
NULL, 5);

-- PropertyID = 6
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
6,
'● Nhà mặt phố Lê Lợi – tuyến đường trung tâm phường Thạch Thang, quận Hải Châu, chỉ cách sông Hàn vài phút đi bộ.
● Diện tích đất 85.1m², mặt tiền rộng, vị trí đẹp thích hợp mở showroom, ngân hàng, phòng giao dịch hoặc kinh doanh dịch vụ cao cấp.
● Kết cấu 1 trệt 1 lầu, có thể cải tạo hoặc xây dựng thêm theo quy hoạch đô thị.
● Gần các công trình trọng điểm như UBND TP Đà Nẵng, nhà hát Trưng Vương, trung tâm hành chính.
● Khu dân cư yên tĩnh, an ninh cao, giao thông 2 chiều thuận tiện.
● Pháp lý đầy đủ, sổ đỏ chính chủ, sang tên nhanh gọn.
● Vị trí và diện tích phù hợp với nhu cầu ở kết hợp kinh doanh hoặc đầu tư dài hạn.',
NULL, 6);
SELECT * FROM Listing;
-- PropertyID = 1
INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES (
1,
'● MLandmark Residences is the new icon by the Han River, located at 58 Bach Dang Street, Hai Chau District – the administrative, economic, and entertainment center of Da Nang City.
● The project enjoys a prime location, just steps away from the Han River swing bridge, facing the west bank with a panoramic view of the city.
● It features a 45-storey tower with 5 basement levels, integrating luxury apartments, Marriott 5-star hotel, shopping mall, restaurants, sky bar, and modern internal amenities.
● The apartments are designed to optimize natural light and ventilation, delivered with international-standard interiors, offering diverse areas from 41m² to 84m² (Studio, 1BR, 2BR).
● Multi-layer security, high-speed elevators, spacious parking garage.
● Long-term ownership, individual red books for each unit, transparent legal status.
● High investment potential due to its prime location, ideal for living, vacation, or both short- and long-term rental.',
NULL, 1);
UPDATE Listing
SET Description = '● MLandmark Residences is the new icon by the Han River, located at 58 Bach Dang Street, Hai Chau District – the administrative, economic, and entertainment center of Da Nang City.
● The project enjoys a prime location, just steps from the Han River swing bridge, offering a panoramic city view.
● Includes a 45-story tower, 5 basements, with luxury apartments, Marriott 5-star hotel, mall, restaurants, sky bar, and amenities.
● Units range from 41m² to 84m² (Studio, 1BR, 2BR), with international-standard finishes.
● Features high-speed elevators, spacious parking, and multi-layer security.
● Long-term ownership with individual red books and clear legal status.
● Ideal for living, vacationing, or short/long-term rental due to high investment value.'
WHERE Listing_ID = 1;
UPDATE Listing
SET Description = '● Sun Costa Residence is located on Vuong Thua Vu Street, Phuoc My Ward, Son Tra – a prime beach tourism location in Da Nang, just 200m from My Khe Beach.
● Studio and 1-bedroom apartments range from 31m² to 40m², ideal for singles, couples, or rental investment.
● Developed by Sun Group, known for high-quality resort real estate and investment value.
● Features include infinity pool, gym, spa, BBQ area, green park, and 24/7 security.
● Easy access to Dragon Bridge, An Thuong Western Street, Da Nang Airport, Han Market.
● Legally complete, long-term red book ownership, and on-time handover.
● Perfect for beachfront living or Airbnb-style investment with tourism potential.'
WHERE Listing_ID = 2;
UPDATE Listing
SET Description = '● High-end Condotel apartment located on Nguyen Thi Minh Khai Street, in the heart of Thach Thang Ward, Hai Chau District – one of the busiest areas in Da Nang.
● The 68m² unit features a modern layout, high ceiling, and large glass windows.
● Fully furnished to hotel standards: bed, wardrobe, sofa, A/C, fridge, TV, washing machine – ready to move in or rent.
● Close to Han Market, Dragon Bridge, Han River, schools, and hospitals.
● Safe, civilized neighborhood – great for residence or tourist rental with high occupancy rates.
● Clear legal documents, separate red book, bank loan support available.
● Professionally managed and suitable for both long-term and short-term leasing.'
WHERE Listing_ID = 3;
UPDATE Listing
SET Description = '● Prime street-front house on Man Thien Street, connecting Nguyen Huu Tho axis with the densely populated Hoa Thuan Tay Ward in Hai Chau.
● Land area: 97m², wide frontage, suitable for renovation or expansion.
● Current layout: 1 ground floor + 1 upper floor, secure structure, yard, kitchen, open living room.
● Ideal for showroom, office, training center, spa, boutique, or jewelry store.
● Convenient location: 5 mins to airport, 7 mins to Dragon Bridge, near supermarkets and schools.
● Busy area with high commercial value, red book available.
● Can transfer immediately, with full legal and planning support.'
WHERE Listing_ID = 4;
UPDATE Listing
SET Description = '● 6-story mini apartment building on Le Van Thu Street, Man Thai Ward, Son Tra – central in Da Nang beach tourism zone.
● Land area: 103.6m², fully constructed, divided into enclosed small units – ideal for serviced apartment operation.
● Two units per floor, elevator, rooftop, shared laundry, communal kitchen, security camera system.
● 3-minute walk to Pham Van Dong Beach, near East Sea Park, international hotels, An Thuong Western Street.
● Stable rental income, potential for homestay or mini-hotel development.
● Clear legal status: red book, long-term residential land, construction approved.
● Strong value appreciation potential in Da Nang’s tourism growth context.'
WHERE Listing_ID = 5;
UPDATE Listing
SET Description = '● Street-front house on Le Loi Street – central route in Thach Thang Ward, Hai Chau District, just minutes from Han River.
● Land area: 85.1m², wide frontage, perfect for showroom, bank, office, or high-end services.
● Structure: 1 ground + 1 upper floor, can renovate or expand per city zoning.
● Near major facilities: Da Nang City Hall, Trung Vuong Theater, administrative center.
● Quiet neighborhood, good security, two-way traffic access.
● Full legal documents, red book in owner’s name, fast transfer process.
● Suitable for living combined with business or long-term investment.'
WHERE Listing_ID = 6;
SELECT * FROM Listing;
SELECT * FROM realestate.listing;
SELECT * FROM Listing WHERE Listing_ID = 2;

INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES
-- Listing 1
(1,
'MLandmark Residences is the new icon by the Han River, located at 58 Bach Dang Street, Hai Chau District – the administrative, economic, and entertainment center of Da Nang City.
The project enjoys a prime location, just steps away from the Han River swing bridge, facing the west bank with a panoramic view of the city.
It features a 45-storey tower with 5 basement levels, integrating luxury apartments, a Marriott 5-star hotel, a shopping mall, restaurants, a sky bar, and modern internal amenities.
The apartments are designed to optimize natural light and ventilation, delivered with international-standard interiors, offering areas from 41m² to 84m² (Studio, 1BR, 2BR).
Multi-layer security, high-speed elevators, spacious parking garage.
Long-term ownership with individual land titles, transparent legal status.
High investment potential due to its prime location, ideal for living, vacation, or both short- and long-term rental.',
NULL, 1),

-- Listing 2
(2,
'Sun Costa Residence is located on Vuong Thua Vu Street, Phuoc My Ward, Son Tra District – a golden location in Da Nang’s beach tourism zone, just 200 meters from My Khe Beach.
Studio and 1-bedroom apartments range from 31m² to 40m², suitable for individuals, couples, or rental investment.
Developed by Sun Group – a leading name in resort real estate, ensuring construction quality and future value growth.
Premium amenities: infinity pool, gym, spa, BBQ area, green park, 24/7 security.
Easy access to Dragon Bridge, An Thuong area, Da Nang International Airport, Han Market.
Complete legal status with long-term ownership.
Perfect for beachside living or Airbnb/booking investment near international tourist zones.',
NULL, 2),

-- Listing 3
(3,
'High-end Condotel located on Nguyen Thi Minh Khai Street – at the heart of Thach Thang Ward, Hai Chau District, one of the busiest areas in Da Nang.
68m² area, modern design, high ceilings, large glass windows for natural light and sea breeze.
Fully furnished hotel-standard unit: bed, wardrobe, sofa, air conditioner, fridge, TV, washing machine – ready for move-in or rental.
Close to major attractions: Han Market, Dragon Bridge, Han River, schools, and hospitals.
Safe and civilized area, ideal for permanent residence or tourism rental with high year-round occupancy.
Clear legal documents with red book; bank loan support available.
Professionally managed for short-term stay or luxury rental services.',
NULL, 3),

-- Listing 4
(4,
'Street-facing house on Man Thien Street – a main road connecting Nguyen Huu Tho with a densely populated residential zone in Hoa Thuan Tay Ward, Hai Chau District.
Land area: 97m², wide frontage, easy to renovate or add floors as needed.
Structure: 1 ground floor + 1 upper floor, solid foundation, parking yard, private kitchen, spacious living room.
Ideal for showroom, office, training center, spa, fashion shop, or jewelry store.
Excellent accessibility: 5 minutes to the airport, 7 minutes to Dragon Bridge, close to supermarket and schools.
Located in a high-traffic commercial area with red book title.
Transfer-ready with full legal and planning support.',
NULL, 4),

-- Listing 5
(5,
'6-storey mini apartment building on Le Van Thu Street, Man Thai Ward, Son Tra District – in the center of Da Nang’s beach tourism zone.
Land area: 103.6m², fully built, divided into private mini-apartments – ideal for serviced apartment operations.
Each floor has 2 units, private elevator, rooftop, shared laundry, communal kitchen, surveillance system.
Only 3-minute walk to Pham Van Dong Beach, near Bien Dong Park, international hotels, An Thuong area.
Can be operated immediately or developed into homestay or mini hotel.
Clear legal documents: red book, long-term residential land, construction certified.
Great appreciation potential thanks to booming tourism.',
NULL, 5),

-- Listing 6
(6,
'Street-front house on Le Loi Street – central location in Thach Thang Ward, Hai Chau District, just a few minutes walk from the Han River.
Land area: 85.1m², wide frontage, ideal for showroom, bank branch, transaction office, or premium business.
Structure: 1 ground + 1 upper floor, can be upgraded according to urban planning.
Close to major facilities: Da Nang City Hall, Trung Vuong Theater, and Administrative Center.
Quiet neighborhood, secure, with 2-way street access.
Complete legal documents with red book; fast ownership transfer.
Perfect for living combined with business or long-term investment.',
NULL, 6);
SELECT * FROM Listing WHERE Listing_ID = 1;
DELETE FROM Listing WHERE Listing_ID IN (1,2,3,4,5,6);

INSERT INTO Listing (Listing_ID, Description, Listing_status, PropertyID) VALUES
-- Listing 1
(1,
'MLandmark Residences is the new icon by the Han River, located at 58 Bach Dang Street, Hai Chau District – the administrative, economic, and entertainment center of Da Nang City.
The project enjoys a prime location, just steps away from the Han River swing bridge, facing the west bank with a panoramic view of the city.
It features a 45-storey tower with 5 basement levels, integrating luxury apartments, a Marriott 5-star hotel, a shopping mall, restaurants, a sky bar, and modern internal amenities.
The apartments are designed to optimize natural light and ventilation, delivered with international-standard interiors, offering areas from 41m² to 84m² (Studio, 1BR, 2BR).
Multi-layer security, high-speed elevators, spacious parking garage.
Long-term ownership with individual land titles, transparent legal status.
High investment potential due to its prime location, ideal for living, vacation, or both short- and long-term rental.',
NULL, 1),

-- Listing 2
(2,
'Sun Costa Residence is located on Vuong Thua Vu Street, Phuoc My Ward, Son Tra District – a golden location in Da Nang’s beach tourism zone, just 200 meters from My Khe Beach.
Studio and 1-bedroom apartments range from 31m² to 40m², suitable for individuals, couples, or rental investment.
Developed by Sun Group – a leading name in resort real estate, ensuring construction quality and future value growth.
Premium amenities: infinity pool, gym, spa, BBQ area, green park, 24/7 security.
Easy access to Dragon Bridge, An Thuong area, Da Nang International Airport, Han Market.
Complete legal status with long-term ownership.
Perfect for beachside living or Airbnb/booking investment near international tourist zones.',
NULL, 2),

-- Listing 3
(3,
'High-end Condotel located on Nguyen Thi Minh Khai Street – at the heart of Thach Thang Ward, Hai Chau District, one of the busiest areas in Da Nang.
68m² area, modern design, high ceilings, large glass windows for natural light and sea breeze.
Fully furnished hotel-standard unit: bed, wardrobe, sofa, air conditioner, fridge, TV, washing machine – ready for move-in or rental.
Close to major attractions: Han Market, Dragon Bridge, Han River, schools, and hospitals.
Safe and civilized area, ideal for permanent residence or tourism rental with high year-round occupancy.
Clear legal documents with red book; bank loan support available.
Professionally managed for short-term stay or luxury rental services.',
NULL, 3),

-- Listing 4
(4,
'Street-facing house on Man Thien Street – a main road connecting Nguyen Huu Tho with a densely populated residential zone in Hoa Thuan Tay Ward, Hai Chau District.
Land area: 97m², wide frontage, easy to renovate or add floors as needed.
Structure: 1 ground floor + 1 upper floor, solid foundation, parking yard, private kitchen, spacious living room.
Ideal for showroom, office, training center, spa, fashion shop, or jewelry store.
Excellent accessibility: 5 minutes to the airport, 7 minutes to Dragon Bridge, close to supermarket and schools.
Located in a high-traffic commercial area with red book title.
Transfer-ready with full legal and planning support.',
NULL, 4),

-- Listing 5
(5,
'6-storey mini apartment building on Le Van Thu Street, Man Thai Ward, Son Tra District – in the center of Da Nang’s beach tourism zone.
Land area: 103.6m², fully built, divided into private mini-apartments – ideal for serviced apartment operations.
Each floor has 2 units, private elevator, rooftop, shared laundry, communal kitchen, surveillance system.
Only 3-minute walk to Pham Van Dong Beach, near Bien Dong Park, international hotels, An Thuong area.
Can be operated immediately or developed into homestay or mini hotel.
Clear legal documents: red book, long-term residential land, construction certified.
Great appreciation potential thanks to booming tourism.',
NULL, 5),

-- Listing 6
(6,
'Street-front house on Le Loi Street – central location in Thach Thang Ward, Hai Chau District, just a few minutes walk from the Han River.
Land area: 85.1m², wide frontage, ideal for showroom, bank branch, transaction office, or premium business.
Structure: 1 ground + 1 upper floor, can be upgraded according to urban planning.
Close to major facilities: Da Nang City Hall, Trung Vuong Theater, and Administrative Center.
Quiet neighborhood, secure, with 2-way street access.
Complete legal documents with red book; fast ownership transfer.
Perfect for living combined with business or long-term investment.',
NULL, 6);
SELECT * FROM realestate.listing;


















