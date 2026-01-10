# API Specification

This document lists the available API endpoints and their expected payloads for the bCoffee API.

## Overview

- **Base URL**: `/api/v1`
- **Auth**: Bearer Token (JWT)
- **Response Format**: JSON

---

## Auth Module

### Admin Auth (`/admin/auth`)

| Method | Endpoint           | Description     | Payload             |
| :----- | :----------------- | :-------------- | :------------------ |
| POST   | `/login`           | Staff login     | `StaffLoginDto`     |
| POST   | `/change-password` | Change password | `ChangePasswordDto` |
| POST   | `/verify-pin`      | Verify PIN      | `VerifyPinDto`      |
| POST   | `/change-pin`      | Change PIN      | `ChangePinDto`      |

#### Payloads

**StaffLoginDto**

- `username` (string)
- `password` (string)

**ChangePasswordDto**

- `oldPassword` (string)
- `newPassword` (string)

**VerifyPinDto**

- `pin` (string, len: 4-6)

**ChangePinDto**

- `newPin` (string, len: 4-6)

### Customer Auth (`/customer/auth`)

| Method | Endpoint             | Description           | Payload                       |
| :----- | :------------------- | :-------------------- | :---------------------------- |
| POST   | `/otp-request`       | Request OTP           | `CustomerOtpRequestDto`       |
| POST   | `/otp-verify`        | Verify OTP            | `CustomerOtpVerifyDto`        |
| POST   | `/register-complete` | Complete Registration | `CustomerRegisterCompleteDto` |
| GET    | `/sessions`          | List Sessions         | -                             |
| DELETE | `/sessions/:id`      | Revoke Session        | -                             |

#### Payloads

**CustomerOtpRequestDto**

- `phone` (string)

**CustomerOtpVerifyDto**

- `phone` (string)
- `otp` (string)
- `deviceId` (uuid)
- `deviceInfo` (DeviceInfoDto, optional)

**CustomerRegisterCompleteDto**

- `registerToken` (string)
- `fullName` (string)
- `referralCode` (string, optional)

---

## Catalog Module

### Categories (`/admin/categories`)

| Method | Endpoint | Description     | Payload             |
| :----- | :------- | :-------------- | :------------------ |
| POST   | `/`      | Create Category | `CreateCategoryDto` |
| GET    | `/`      | List Categories | -                   |
| PATCH  | `/:id`   | Update Category | `UpdateCategoryDto` |
| DELETE | `/:id`   | Delete Category | -                   |

### Badges (`/admin/badges`)

| Method | Endpoint | Description  | Payload          |
| :----- | :------- | :----------- | :--------------- |
| POST   | `/`      | Create Badge | `CreateBadgeDto` |
| GET    | `/`      | List Badges  | -                |
| PATCH  | `/:id`   | Update Badge | `UpdateBadgeDto` |
| DELETE | `/:id`   | Delete Badge | -                |

#### Payloads

**CreateCategoryDto**

- `name` (LocalizedText)
- `slug` (string)
- `description` (LocalizedText, optional)

**CreateBadgeDto**

- `name` (LocalizedText)
- `code` (string)
- `color` (string, hex, optional)

---

## Product Module (`/admin/products`)

| Method | Endpoint                   | Description          | Payload                    |
| :----- | :------------------------- | :------------------- | :------------------------- |
| POST   | `/`                        | Create Product       | `CreateProductDto`         |
| GET    | `/`                        | List/Filter Products | `FilterProductDto` (Query) |
| GET    | `/:id`                     | Get Product          | -                          |
| PATCH  | `/:id`                     | Update Product       | `UpdateProductDto`         |
| DELETE | `/:id`                     | Delete Product       | -                          |
| POST   | `/:productId/groups`       | Add Option Group     | `CreateOptionGroupDto`     |
| POST   | `/groups/:groupId/choices` | Add Option Choice    | `CreateOptionChoiceDto`    |
| DELETE | `/groups/:groupId`         | Remove Option Group  | -                          |
| DELETE | `/choices/:choiceId`       | Remove Option Choice | -                          |

#### Payloads

**CreateProductDto**

- `name` (LocalizedText)
- `sku` (string)
- `basePrice` (number)
- `categoryId` (uuid)
- `description` (LocalizedText, optional)
- `collectionIds` (uuid[], optional)

**CreateOptionGroupDto**

- `name` (LocalizedText)
- `sku` (string)
- `type` (enum: SINGLE, MULTIPLE)
- `minSelect` (number)
- `maxSelect` (number)

**CreateOptionChoiceDto**

- `name` (LocalizedText)
- `sku` (string)
- `priceModifier` (number)

---

## Collection Module (`/admin/collections`)

| Method | Endpoint | Description       | Payload               |
| :----- | :------- | :---------------- | :-------------------- |
| POST   | `/`      | Create Collection | `CreateCollectionDto` |
| GET    | `/`      | List Collections  | -                     |
| GET    | `/:id`   | Get Collection    | -                     |
| PATCH  | `/:id`   | Update Collection | `UpdateCollectionDto` |
| DELETE | `/:id`   | Delete Collection | -                     |

#### Payloads

**CreateCollectionDto**

- `name` (LocalizedText)
- `slug` (string)
- `productIds` (uuid[], optional)
- `bannerUrl` (string, optional)

---

## Inventory Module

### Ingredients (`/admin/ingredients`)

| Method | Endpoint | Description       | Payload               |
| :----- | :------- | :---------------- | :-------------------- |
| POST   | `/`      | Create Ingredient | `CreateIngredientDto` |
| GET    | `/`      | List Ingredients  | -                     |
| PATCH  | `/:id`   | Update Ingredient | `UpdateIngredientDto` |

### Units of Measure (`/admin/uoms`)

| Method | Endpoint | Description            | Payload         |
| :----- | :------- | :--------------------- | :-------------- |
| POST   | `/`      | Create Unit of Measure | `CreateUnitDto` |
| GET    | `/`      | List Units             | -               |

### Recipes (`/admin/recipes`)

| Method | Endpoint              | Description             | Payload           |
| :----- | :-------------------- | :---------------------- | :---------------- |
| POST   | `/`                   | Create Recipe Link      | `CreateRecipeDto` |
| DELETE | `/:id`                | Delete Recipe Link      | -                 |
| GET    | `/product/:productId` | Get Recipes for Product | -                 |
| GET    | `/option/:optionId`   | Get Recipes for Option  | -                 |

#### Payloads

**CreateRecipeDto**

- `ingredientId` (uuid)
- `quantity` (number)
- `productId` (uuid, optional, XOR with optionId)
- `optionId` (uuid, optional, XOR with productId)

---

## Promotions Module (`/admin/promotions`)

| Method | Endpoint                 | Description       | Payload              |
| :----- | :----------------------- | :---------------- | :------------------- |
| POST   | `/`                      | Create Promotion  | `CreatePromotionDto` |
| GET    | `/`                      | List Promotions   | -                    |
| POST   | `/:id/generate-vouchers` | Generate Vouchers | `GenerateVoucherDto` |

#### Payloads

**CreatePromotionDto**

- `name` (LocalizedText)
- `description` (LocalizedText, optional)
- `type` (enum: PERCENTAGE, FIXED_AMOUNT)
- `value` (number)
- `scope` (enum: GLOBAL, CATEGORY, COLLECTION, PRODUCT)
- `budgetLimitAmount` (number, optional)
- `sku` (string, optional)
- `startDate` (ISO Date, optional)
- `endDate` (ISO Date, optional)
- `productIds` (uuid[], optional)
- `categoryIds` (uuid[], optional)
- `collectionIds` (uuid[], optional)

**GenerateVoucherDto**

- `promotionId` (uuid)
- `quantity` (number, 1-1000)
- `prefix` (string)

---

## Order Module (`/admin/orders`)

| Method | Endpoint | Description       | Payload                |
| :----- | :------- | :---------------- | :--------------------- |
| GET    | `/`      | List Orders       | `GetOrdersDto` (Query) |
| GET    | `/:id`   | Get Order Details | -                      |

#### Payloads

**GetOrdersDto**

- `page` (number, optional, default: 1)
- `limit` (number, optional, default: 20)
- `shopId` (uuid, optional)
- `status` (enum: OrderStatus, optional)
- `startDate` (ISO Date, optional)
- `endDate` (ISO Date, optional)
- `search` (string, optional - Search by Invoice Code)

---

## Analytics Module (`/admin/analytics`)

| Method | Endpoint        | Description      | Payload                   |
| :----- | :-------------- | :--------------- | :------------------------ |
| GET    | `/summary`      | Revenue Overview | `GetAnalyticsDto` (Query) |
| GET    | `/sales-chart`  | Sales Chart Data | `GetAnalyticsDto` (Query) |
| GET    | `/top-products` | Top Products     | `GetAnalyticsDto` (Query) |
| GET    | `/low-stock`    | Low Stock Alerts | `GetAnalyticsDto` (Query) |

#### Payloads

**GetAnalyticsDto**

- `startDate` (ISO Date)
- `endDate` (ISO Date)
- `shopId` (uuid, optional)
- `groupBy` (enum: day, hour, optional)

---

## Operations Module

### Staff Shifts (`/staff/shifts`)

| Method | Endpoint | Description            | Payload         |
| :----- | :------- | :--------------------- | :-------------- |
| POST   | `/start` | Start Shift (Clock In) | `StartShiftDto` |
| POST   | `/end`   | End Shift (Clock Out)  | `EndShiftDto`   |

### Cash Drawer (`/staff/drawer`)

| Method | Endpoint | Description  | Payload          |
| :----- | :------- | :----------- | :--------------- |
| POST   | `/open`  | Open Drawer  | `OpenDrawerDto`  |
| POST   | `/close` | Close Drawer | `CloseDrawerDto` |

### Admin Shifts (`/admin/shifts`)

| Method | Endpoint | Description | Payload                     |
| :----- | :------- | :---------- | :-------------------------- |
| GET    | `/`      | List Shifts | `shopId`, `staffId` (Query) |

### Admin Drawers (`/admin/drawers`)

| Method | Endpoint | Description          | Payload          |
| :----- | :------- | :------------------- | :--------------- |
| GET    | `/`      | List Drawer Sessions | `shopId` (Query) |

#### Payloads

**OpenDrawerDto**

- `shopId` (uuid)
- `openingBalance` (number)
- `note` (string, optional)

**CloseDrawerDto**

- `closingBalance` (number)
- `note` (string, optional)

**StartShiftDto**

- `shopId` (uuid)
- `shiftRole` (string)

**EndShiftDto**

- `endedAt` (ISO Date, optional)

---

## Shop Config & Menu

### Configuration (`/admin/shops/:shopId/config`)

| Method | Endpoint                         | Description              | Payload                    |
| :----- | :------------------------------- | :----------------------- | :------------------------- |
| GET    | `/payment-methods`               | List Payment Methods     | -                          |
| PATCH  | `/payment-methods/:methodId`     | Update Payment Method    | `UpdateShopPaymentDto`     |
| GET    | `/fulfillment-methods`           | List Fulfillment Methods | -                          |
| PATCH  | `/fulfillment-methods/:methodId` | Update Fulfillment       | `UpdateShopFulfillmentDto` |

### Shop Menu (`/admin/shops/:shopId/menu`)

| Method | Endpoint               | Description             | Payload                |
| :----- | :--------------------- | :---------------------- | :--------------------- |
| POST   | `/products`            | Assign/Publish Products | `AssignProductsDto`    |
| GET    | `/`                    | Get Shop Menu           | -                      |
| PATCH  | `/products/:productId` | Override Product Config | `UpdateShopProductDto` |

#### Payloads

**UpdateShopPaymentDto**

- `isEnabled` (boolean)
- `sortOrder` (number)

**UpdateShopFulfillmentDto**

- `isEnabled` (boolean)
- `feePercentage` (number)

**AssignProductsDto**

- `productIds` (uuid[])

**UpdateShopProductDto**

- `price` (number, optional)
- `isAvailable` (boolean, optional)

---

## Staff Management Module (`/admin/staff`)

| Method | Endpoint                   | Description        | Payload               |
| :----- | :------------------------- | :----------------- | :-------------------- |
| POST   | `/`                        | Create Staff       | `CreateStaffDto`      |
| GET    | `/`                        | List Staff         | -                     |
| POST   | `/:id/shop-access`         | Assign Shop Access | `AssignShopAccessDto` |
| DELETE | `/:id/shop-access/:shopId` | Remove Shop Access | -                     |

#### Payloads

**CreateStaffDto**

- `username` (string, 3-50 chars)
- `fullName` (string)
- `password` (string, 8-100 chars)
- `pin` (string, 4-6 digits)
- `phone` (string)
- `globalRoleId` (uuid, optional)

**AssignShopAccessDto**

- `shopId` (uuid)
- `roleId` (uuid, optional)

---

## Surcharge Module (`/admin/surcharges`)

| Method | Endpoint | Description      | Payload              |
| :----- | :------- | :--------------- | :------------------- |
| POST   | `/`      | Create Surcharge | `CreateSurchargeDto` |
| GET    | `/`      | List Surcharges  | -                    |
| PATCH  | `/:id`   | Toggle Status    | -                    |

#### Payloads

**CreateSurchargeDto**

- `name` (LocalizedText)
- `value` (number)
- `type` (enum: PERCENTAGE, FIXED_AMOUNT)
- `isTax` (boolean, optional)
- `isActive` (boolean, optional)

---

## IAM Module (`/admin`)

| Method | Endpoint       | Description             | Payload         |
| :----- | :------------- | :---------------------- | :-------------- |
| POST   | `/roles`       | Create Global Role      | `CreateRoleDto` |
| GET    | `/roles`       | List Roles              | -               |
| GET    | `/permissions` | List System Permissions | -               |

#### Payloads

**CreateRoleDto**

- `name` (LocalizedText)
- `slug` (string)
- `description` (LocalizedText, optional)
- `permissionIds` (uuid[])

---

## Communication Module (`/admin/announcements`)

| Method | Endpoint | Description         | Payload                 |
| :----- | :------- | :------------------ | :---------------------- |
| POST   | `/`      | Create Announcement | `CreateAnnouncementDto` |
| GET    | `/`      | List Announcements  | -                       |
| PATCH  | `/:id`   | Update Announcement | `UpdateAnnouncementDto` |
| DELETE | `/:id`   | Delete Announcement | -                       |

#### Payloads

**CreateAnnouncementDto**

- `title` (LocalizedText)
- `content` (LocalizedText)
- `targetAudience` (enum: CUSTOMER, STAFF, ALL)
- `imageUrl` (string, optional)
- `priority` (enum: HIGH, NORMAL, optional)

**UpdateAnnouncementDto**

- `isActive` (boolean, optional)
- _(plus partial fields from CreateAnnouncementDto)_

---

## CRM Module (`/admin/customers`)

| Method | Endpoint              | Description        | Payload                    |
| :----- | :-------------------- | :----------------- | :------------------------- |
| GET    | `/`                   | List Customers     | `CustomerQueryDto` (Query) |
| GET    | `/:id`                | Get Customer       | -                          |
| PATCH  | `/:id/status`         | Ban/Unban Customer | `UpdateCustomerStatusDto`  |
| POST   | `/:id/loyalty/adjust` | Adjust Loyalty     | `AdjustLoyaltyDto`         |

#### Payloads

**CustomerQueryDto**

- `page` (number, optional, default: 1)
- `limit` (number, optional, default: 20)
- `status` (enum: ACTIVE, BANNED, optional)
- `search` (string, optional - Search by Name/Phone)

**UpdateCustomerStatusDto**

- `status` (enum: ACTIVE, BANNED)
- `reason` (string)

**AdjustLoyaltyDto**

- `points` (number)
- `reason` (string)

---

## Review Module (`/admin/reviews`)

| Method | Endpoint          | Description       | Payload                     |
| :----- | :---------------- | :---------------- | :-------------------------- |
| GET    | `/`               | List Reviews      | `ReviewQueryDto` (Query)    |
| POST   | `/:id/reply`      | Reply to Review   | `ReplyReviewDto`            |
| PATCH  | `/:id/visibility` | Toggle Visibility | `UpdateReviewVisibilityDto` |

#### Payloads

**ReviewQueryDto**

- `page` (number, optional, default: 1)
- `limit` (number, optional, default: 20)
- `shopId` (uuid, optional)
- `rating` (number 1-5, optional)
- `isReplied` (boolean, optional)

**ReplyReviewDto**

- `replyText` (string)

**UpdateReviewVisibilityDto**

- `isPublic` (boolean)

---

## System Configuration Module

### Business Profile (`/admin/business`)

| Method | Endpoint | Description             | Payload                    |
| :----- | :------- | :---------------------- | :------------------------- |
| GET    | `/`      | Get Business Profile    | -                          |
| PATCH  | `/`      | Update Business Profile | `UpdateBusinessProfileDto` |

### Mobile Versions (`/admin/mobile-versions`)

| Method | Endpoint | Description     | Payload                  |
| :----- | :------- | :-------------- | :----------------------- |
| GET    | `/`      | List Versions   | -                        |
| POST   | `/`      | Publish Version | `CreateMobileVersionDto` |

### Audit Logs (`/admin/audit-logs`)

| Method | Endpoint | Description     | Payload            |
| :----- | :------- | :-------------- | :----------------- |
| GET    | `/`      | List Audit Logs | `AuditLogQueryDto` |

#### Payloads

**UpdateBusinessProfileDto**

- `name` (LocalizedText, optional)
- `supportEmail` (string, optional)
- `logoUrl` (string, optional)
- `bannerImageUrl` (string, optional)

**CreateMobileVersionDto**

- `platform` (enum: IOS, ANDROID)
- `version` (string)
- `minUsableVersion` (string)
- `message` (LocalizedText)
- `updateUrl` (string)

**AuditLogQueryDto**

- `page` (number, optional, default: 1)
- `limit` (number, optional, default: 20)
- `staffId` (uuid, optional)
- `targetResource` (string, optional)
- `startDate` (ISO Date, optional)
- `endDate` (ISO Date, optional)
