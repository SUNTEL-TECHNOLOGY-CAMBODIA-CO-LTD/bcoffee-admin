# Data Specification

## Enums

### BusinessStatus

- PENDING
- ACTIVE
- SUSPENDED
- ARCHIVED

### UserStatus

- PENDING
- ACTIVE
- BANNED

### ProductStatus

- DRAFT
- ACTIVE
- ARCHIVED

### OptionType

- VARIANT
- MODIFIER
- ADDON

### OrderStatus

- PENDING
- CONFIRMED
- PREPARING
- READY
- COMPLETED
- CANCELLED

### FulfillmentCategory

- DINE_IN
- TAKEAWAY
- DELIVERY

### DiscountType

- FIXED
- PERCENTAGE
- FIXED_PRICE

### SurchargeType

- PERCENTAGE
- FIXED_AMOUNT

### AuthEventType

- LOGIN_SUCCESS
- LOGIN_FAILED
- LOGOUT
- TOKEN_REFRESH
- PASSWORD_CHANGED
- MFA_CHALLENGE_PASSED
- MFA_CHALLENGE_FAILED
- DEVICE_REVOKED

### PaymentCategory

- CASH
- QR
- CARD
- WALLET
- BANK_TRANSFER

### PaymentStatus

- INITIATED
- PENDING_USER_ACTION
- SUCCESS
- FAILED
- REFUNDED
- CANCELLED

### PromotionScope

- CART
- CATEGORY
- PRODUCT

### AnnouncementTargetAudience

- CUSTOMER
- STAFF
- ALL

### AnnouncementPriority

- HIGH
- NORMAL

### NotificationType

- ORDER_UPDATE
- SYSTEM_ALERT
- PROMOTION

## Models

### AdminAuditLog

| Field               | Type     | Attributes                                                    | Description         |
| ------------------- | -------- | ------------------------------------------------------------- | ------------------- |
| id                  | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key         |
| shopId              | String?  | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)  |
| actorStaffId        | String?  | @map("actor_staff_id") @db.Uuid                               | Foreign Key (Staff) |
| authorizedByStaffId | String?  | @map("authorized_by_staff_id") @db.Uuid                       | Foreign Key (Staff) |
| actionType          | String?  | @map("action_type") @db.VarChar(50)                           |                     |
| targetResource      | String?  | @map("target_resource") @db.VarChar(50)                       |                     |
| targetId            | String?  | @map("target_id") @db.Uuid                                    |                     |
| details             | Json?    | @map("details")                                               |                     |
| createdAt           | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                     |
| updatedAt           | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                     |

### User

| Field            | Type        | Attributes                                                    | Description        |
| ---------------- | ----------- | ------------------------------------------------------------- | ------------------ |
| id               | String      | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key        |
| phone            | String      | @unique @map("phone") @db.VarChar(20)                         |                    |
| fullName         | String?     | @map("full_name") @db.VarChar(100)                            |                    |
| profileImageUrl  | String?     | @map("profile_image_url")                                     |                    |
| status           | UserStatus? | @default(ACTIVE) @map("status")                               | Enum               |
| dob              | DateTime?   | @map("dob") @db.Date                                          |                    |
| referralCode     | String?     | @unique @map("referral_code") @db.VarChar(20)                 |                    |
| referredByUserId | String?     | @map("referred_by_user_id") @db.Uuid                          | Foreign Key (User) |
| createdAt        | DateTime    | @default(now()) @map("created_at") @db.Timestamptz            |                    |
| updatedAt        | DateTime    | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                    |

### UserDevice

| Field        | Type      | Attributes                                                    | Description        |
| ------------ | --------- | ------------------------------------------------------------- | ------------------ |
| id           | String    | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key        |
| userId       | String    | @map("user_id") @db.Uuid                                      | Foreign Key (User) |
| deviceIdHash | String    | @map("device_id_hash") @db.VarChar(64)                        |                    |
| deviceName   | String?   | @map("device_name") @db.VarChar(100)                          |                    |
| deviceType   | String?   | @map("device_type") @db.VarChar(20)                           |                    |
| deviceModel  | String?   | @map("device_model") @db.VarChar(50)                          |                    |
| deviceOs     | String?   | @map("device_os") @db.VarChar(50)                             |                    |
| osVersion    | String?   | @map("os_version") @db.VarChar(50)                            |                    |
| fcmToken     | String?   | @map("fcm_token")                                             |                    |
| isTrusted    | Boolean?  | @default(true) @map("is_trusted")                             |                    |
| isBlocked    | Boolean?  | @default(false) @map("is_blocked")                            |                    |
| lastActiveAt | DateTime? | @map("last_active_at") @db.Timestamptz                        |                    |
| createdAt    | DateTime  | @default(now()) @map("created_at") @db.Timestamptz            |                    |
| updatedAt    | DateTime  | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                    |

### UserSession

| Field            | Type     | Attributes                                                    | Description              |
| ---------------- | -------- | ------------------------------------------------------------- | ------------------------ |
| id               | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key              |
| userId           | String   | @map("user_id") @db.Uuid                                      | Foreign Key (User)       |
| deviceId         | String   | @map("device_id") @db.Uuid                                    | Foreign Key (UserDevice) |
| refreshTokenHash | String   | @map("refresh_token_hash") @db.VarChar(255)                   |                          |
| ipAddress        | String?  | @map("ip_address") @db.VarChar(45)                            |                          |
| userAgent        | String?  | @map("user_agent")                                            |                          |
| expiresAt        | DateTime | @map("expires_at") @db.Timestamptz                            |                          |
| createdAt        | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                          |
| updatedAt        | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                          |

### AccessLog

| Field         | Type          | Attributes                                                    | Description              |
| ------------- | ------------- | ------------------------------------------------------------- | ------------------------ |
| id            | String        | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key              |
| userId        | String?       | @map("user_id") @db.Uuid                                      | Foreign Key (User)       |
| deviceId      | String?       | @map("device_id") @db.Uuid                                    | Foreign Key (UserDevice) |
| eventType     | AuthEventType | @map("event_type")                                            | Enum                     |
| ipAddress     | String?       | @map("ip_address") @db.VarChar(45)                            |                          |
| geoCountry    | String?       | @map("geo_country") @db.VarChar(2)                            |                          |
| geoCity       | String?       | @map("geo_city") @db.VarChar(50)                              |                          |
| userAgent     | String?       | @map("user_agent")                                            |                          |
| failureReason | String?       | @map("failure_reason") @db.VarChar(255)                       |                          |
| createdAt     | DateTime      | @default(now()) @map("created_at") @db.Timestamptz            |                          |
| updatedAt     | DateTime      | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                          |

### Cart

| Field     | Type     | Attributes                                                    | Description        |
| --------- | -------- | ------------------------------------------------------------- | ------------------ |
| id        | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key        |
| userId    | String   | @map("user_id") @db.Uuid                                      | Foreign Key (User) |
| shopId    | String   | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop) |
| version   | Int?     | @default(1) @map("version")                                   |                    |
| createdAt | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                    |
| updatedAt | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                    |

### CartItem

| Field        | Type     | Attributes                                                    | Description           |
| ------------ | -------- | ------------------------------------------------------------- | --------------------- |
| id           | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key           |
| cartId       | String   | @map("cart_id") @db.Uuid                                      | Foreign Key (Cart)    |
| productId    | String   | @map("product_id") @db.Uuid                                   | Foreign Key (Product) |
| quantity     | Int?     | @map("quantity")                                              |                       |
| options      | Json?    | @map("options")                                               |                       |
| instructions | String?  | @map("instructions")                                          |                       |
| version      | Int?     | @default(1) @map("version")                                   |                       |
| createdAt    | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                       |
| updatedAt    | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                       |

### GroupCart

| Field          | Type     | Attributes                                                    | Description        |
| -------------- | -------- | ------------------------------------------------------------- | ------------------ |
| id             | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key        |
| hostUserId     | String   | @map("host_user_id") @db.Uuid                                 | Foreign Key (User) |
| shopId         | String   | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop) |
| shareLinkToken | String?  | @unique @map("share_link_token") @db.VarChar(50)              |                    |
| status         | String?  | @default("OPEN") @map("status") @db.VarChar(20)               |                    |
| createdAt      | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                    |
| updatedAt      | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                    |
| version        | Int?     | @default(1) @map("version")                                   |                    |

### GroupCartMember

| Field       | Type     | Attributes                                                    | Description             |
| ----------- | -------- | ------------------------------------------------------------- | ----------------------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key             |
| groupCartId | String   | @map("group_cart_id") @db.Uuid                                | Foreign Key (GroupCart) |
| userId      | String   | @map("user_id") @db.Uuid                                      | Foreign Key (User)      |
| guestName   | String?  | @map("guest_name") @db.VarChar(50)                            |                         |
| status      | String?  | @default("BROWSING") @map("status") @db.VarChar(20)           |                         |
| joinedAt    | DateTime | @default(now()) @map("joined_at") @db.Timestamptz             |                         |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                         |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                         |

### GroupCartItem

| Field           | Type     | Attributes                                                    | Description                   |
| --------------- | -------- | ------------------------------------------------------------- | ----------------------------- |
| id              | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                   |
| groupCartId     | String   | @map("group_cart_id") @db.Uuid                                | Foreign Key (GroupCart)       |
| addedByMemberId | String   | @map("added_by_member_id") @db.Uuid                           | Foreign Key (GroupCartMember) |
| productId       | String   | @map("product_id") @db.Uuid                                   | Foreign Key (Product)         |
| quantity        | Int?     | @map("quantity")                                              |                               |
| options         | Json?    | @map("options")                                               |                               |
| instructions    | String?  | @map("instructions")                                          |                               |
| version         | Int?     | @default(1) @map("version")                                   |                               |
| createdAt       | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                               |
| updatedAt       | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                               |

### Product

| Field       | Type           | Attributes                                                    | Description            |
| ----------- | -------------- | ------------------------------------------------------------- | ---------------------- |
| id          | String         | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId  | String         | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| sku         | String         | @unique @map("sku") @db.VarChar(50)                           |                        |
| name        | Json           | @map("name")                                                  |                        |
| description | Json?          | @map("description")                                           |                        |
| imageUrl    | Json?          | @map("image_url")                                             |                        |
| price       | Decimal?       | @map("price") @db.Decimal(10, 2)                              |                        |
| status      | ProductStatus? | @default(ACTIVE) @map("status")                               | Enum                   |
| version     | Int?           | @default(1) @map("version")                                   |                        |
| categoryId  | String         | @map("category_id") @db.Uuid                                  | Foreign Key (Category) |
| createdAt   | DateTime       | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt   | DateTime       | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### ProductOptionGroup

| Field     | Type       | Attributes                                                    | Description           |
| --------- | ---------- | ------------------------------------------------------------- | --------------------- |
| id        | String     | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key           |
| productId | String     | @map("product_id") @db.Uuid                                   | Foreign Key (Product) |
| sku       | String     | @unique @map("sku") @db.VarChar(50)                           |                       |
| name      | Json       | @map("name")                                                  |                       |
| type      | OptionType | @default(VARIANT) @map("type")                                | Enum                  |
| minSelect | Int?       | @map("min_select")                                            |                       |
| maxSelect | Int?       | @map("max_select")                                            |                       |
| version   | Int?       | @default(1) @map("version")                                   |                       |
| createdAt | DateTime   | @default(now()) @map("created_at") @db.Timestamptz            |                       |
| updatedAt | DateTime   | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                       |

### ProductOptionChoice

| Field     | Type     | Attributes                                                    | Description                      |
| --------- | -------- | ------------------------------------------------------------- | -------------------------------- |
| id        | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                      |
| groupId   | String   | @map("group_id") @db.Uuid                                     | Foreign Key (ProductOptionGroup) |
| sku       | String   | @unique @map("sku") @db.VarChar(50)                           |                                  |
| name      | Json     | @map("name")                                                  |                                  |
| imageUrl  | Json?    | @map("image_url")                                             |                                  |
| price     | Decimal? | @map("price") @db.Decimal(10, 2)                              |                                  |
| version   | Int?     | @default(1) @map("version")                                   |                                  |
| createdAt | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                  |
| updatedAt | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                  |

### Category

| Field       | Type     | Attributes                                                    | Description            |
| ----------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId  | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| slug        | String   | @map("slug") @db.VarChar(100)                                 |                        |
| description | Json?    | @map("description")                                           |                        |
| name        | Json?    | @map("name")                                                  |                        |
| parentId    | String?  | @map("parent_id") @db.Uuid                                    | Foreign Key (Category) |
| sortOrder   | Int?     | @map("sort_order")                                            |                        |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### Collection

| Field      | Type     | Attributes                                                    | Description            |
| ---------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id         | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| name       | Json     | @map("name")                                                  |                        |
| slug       | String   | @map("slug") @db.VarChar(100)                                 |                        |
| isActive   | Boolean  | @default(true) @map("is_active")                              |                        |
| bannerUrl  | Json?    | @map("banner_url")                                            |                        |
| createdAt  | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt  | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### MarketingBadge

| Field      | Type     | Attributes                                                    | Description            |
| ---------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id         | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| code       | String   | @map("code") @db.VarChar(50)                                  |                        |
| label      | Json     | @map("label")                                                 |                        |
| bgColor    | String   | @map("bg_color") @db.VarChar(7)                               |                        |
| textColor  | String?  | @default("#FFFFFF") @map("text_color") @db.VarChar(7)         |                        |
| imageUrl   | Json?    | @map("image_url")                                             |                        |
| isActive   | Boolean? | @default(true) @map("is_active")                              |                        |
| createdAt  | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt  | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### PaymentMethod

| Field        | Type            | Attributes                                                    | Description            |
| ------------ | --------------- | ------------------------------------------------------------- | ---------------------- |
| id           | String          | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId   | String?         | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| slug         | String          | @map("slug") @db.VarChar(50)                                  |                        |
| name         | Json            | @map("name")                                                  |                        |
| description  | Json?           | @map("description")                                           |                        |
| logoUrl      | String?         | @map("logo_url")                                              |                        |
| category     | PaymentCategory | @map("category")                                              | Enum                   |
| isDigital    | Boolean?        | @default(true) @map("is_digital")                             |                        |
| publicConfig | Json?           | @map("public_config")                                         |                        |
| isActive     | Boolean?        | @default(true) @map("is_active")                              |                        |
| createdAt    | DateTime        | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt    | DateTime        | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### ShopPaymentMethod

| Field                | Type     | Attributes                                                    | Description                                |
| -------------------- | -------- | ------------------------------------------------------------- | ------------------------------------------ |
| shopId               | String   | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop), Composite Key          |
| paymentMethodId      | String   | @map("payment_method_id") @db.Uuid                            | Foreign Key (PaymentMethod), Composite Key |
| isEnabled            | Boolean? | @default(true) @map("is_enabled")                             |                                            |
| sortOrder            | Int?     | @default(0) @map("sort_order")                                |                                            |
| publicConfigOverride | Json?    | @map("public_config_override")                                |                                            |
| createdAt            | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                            |
| updatedAt            | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                            |

### PaymentTransaction

| Field                   | Type           | Attributes                                                    | Description                 |
| ----------------------- | -------------- | ------------------------------------------------------------- | --------------------------- |
| id                      | String         | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                 |
| orderId                 | String         | @map("order_id") @db.Uuid                                     | Foreign Key (Order)         |
| paymentMethodId         | String         | @map("payment_method_id") @db.Uuid                            | Foreign Key (PaymentMethod) |
| externalTransactionId   | String?        | @map("external_transaction_id") @db.VarChar(100)              |                             |
| externalPaymentUrl      | String?        | @map("external_payment_url")                                  |                             |
| amount                  | Decimal        | @map("amount") @db.Decimal(10, 2)                             |                             |
| currency                | String?        | @default("USD") @map("currency") @db.VarChar(3)               |                             |
| status                  | PaymentStatus? | @default(INITIATED) @map("status")                            | Enum                        |
| gatewayResponseSnapshot | Json?          | @map("gateway_response_snapshot")                             |                             |
| failureReason           | String?        | @map("failure_reason") @db.VarChar(255)                       |                             |
| createdAt               | DateTime       | @default(now()) @map("created_at") @db.Timestamptz            |                             |
| updatedAt               | DateTime       | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                             |

### SurchargeConfig

| Field             | Type                  | Attributes                                                    | Description            |
| ----------------- | --------------------- | ------------------------------------------------------------- | ---------------------- |
| id                | String                | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId        | String                | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| name              | Json                  | @map("name")                                                  |                        |
| description       | Json?                 | @map("description")                                           |                        |
| type              | SurchargeType         | @map("type")                                                  | Enum                   |
| value             | Decimal               | @map("value") @db.Decimal(10, 2)                              |                        |
| isTax             | Boolean?              | @default(false) @map("is_tax")                                |                        |
| isTaxInclusive    | Boolean?              | @default(false) @map("is_tax_inclusive")                      |                        |
| isAutoApplied     | Boolean?              | @default(true) @map("is_auto_applied")                        |                        |
| applyToOrderTypes | FulfillmentCategory[] | @map("apply_to_order_types")                                  | Enum Array             |
| isActive          | Boolean?              | @default(true) @map("is_active")                              |                        |
| createdAt         | DateTime              | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt         | DateTime              | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### CashDrawerSession

| Field          | Type      | Attributes                                                    | Description         |
| -------------- | --------- | ------------------------------------------------------------- | ------------------- |
| id             | String    | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key         |
| shopId         | String    | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)  |
| openedBy       | String    | @map("opened_by") @db.Uuid                                    | Foreign Key (Staff) |
| closedBy       | String    | @map("closed_by") @db.Uuid                                    | Foreign Key (Staff) |
| openingBalance | Decimal?  | @map("opening_balance") @db.Decimal(10, 2)                    |                     |
| closingBalance | Decimal?  | @map("closing_balance") @db.Decimal(10, 2)                    |                     |
| cashDifference | Decimal?  | @map("cash_difference") @db.Decimal(10, 2)                    |                     |
| startedAt      | DateTime? | @default(now()) @map("started_at") @db.Timestamptz            |                     |
| endedAt        | DateTime? | @map("ended_at") @db.Timestamptz                              |                     |
| note           | String?   | @map("note")                                                  |                     |
| createdAt      | DateTime  | @default(now()) @map("created_at") @db.Timestamptz            |                     |
| updatedAt      | DateTime  | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                     |

### Ingredient

| Field      | Type     | Attributes                                                    | Description                 |
| ---------- | -------- | ------------------------------------------------------------- | --------------------------- |
| id         | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                 |
| businessId | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business)      |
| name       | Json?    | @map("name")                                                  |                             |
| unitId     | String   | @map("unit_id") @db.Uuid                                      | Foreign Key (UnitOfMeasure) |
| sku        | String   | @unique @map("sku") @db.VarChar(50)                           |                             |
| cost       | Decimal? | @map("cost") @db.Decimal(10, 4)                               |                             |
| createdAt  | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                             |
| updatedAt  | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                             |

### ProductRecipe

| Field        | Type     | Attributes                                                    | Description              |
| ------------ | -------- | ------------------------------------------------------------- | ------------------------ |
| id           | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key              |
| productId    | String   | @map("product_id") @db.Uuid                                   | Foreign Key (Product)    |
| optionId     | String?  | @map("option_id") @db.Uuid                                    |                          |
| ingredientId | String   | @map("ingredient_id") @db.Uuid                                | Foreign Key (Ingredient) |
| quantity     | Decimal? | @map("quantity") @db.Decimal(10, 2)                           |                          |
| createdAt    | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                          |
| updatedAt    | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                          |

### ShopIngredient

| Field             | Type      | Attributes                                                    | Description              |
| ----------------- | --------- | ------------------------------------------------------------- | ------------------------ |
| id                | String    | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key              |
| shopId            | String    | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)       |
| ingredientId      | String    | @map("ingredient_id") @db.Uuid                                | Foreign Key (Ingredient) |
| currentStock      | Decimal?  | @map("current_stock") @db.Decimal(10, 2)                      |                          |
| price             | Decimal?  | @map("price") @db.Decimal(10, 4)                              |                          |
| lowStockThreshold | Decimal?  | @map("low_stock_threshold") @db.Decimal(10, 2)                |                          |
| lastRestockedAt   | DateTime? | @map("last_restocked_at") @db.Timestamptz                     |                          |
| createdAt         | DateTime  | @default(now()) @map("created_at") @db.Timestamptz            |                          |
| updatedAt         | DateTime  | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                          |

### Promotion

| Field             | Type           | Attributes                                                    | Description            |
| ----------------- | -------------- | ------------------------------------------------------------- | ---------------------- |
| id                | String         | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId        | String         | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| name              | Json?          | @map("name")                                                  |                        |
| description       | Json?          | @map("description")                                           |                        |
| sku               | String?        | @map("sku") @db.VarChar(50)                                   |                        |
| type              | DiscountType   | @map("type")                                                  | Enum                   |
| value             | Decimal?       | @map("value") @db.Decimal(10, 2)                              |                        |
| budgetLimitAmount | Decimal?       | @map("budget_limit_amount") @db.Decimal(10, 2)                |                        |
| totalAmountBurned | Decimal?       | @default(0) @map("total_amount_burned") @db.Decimal(10, 2)    |                        |
| scope             | PromotionScope | @default(CART) @map("scope")                                  | Enum                   |
| status            | String?        | @map("status") @db.VarChar(20)                                |                        |
| startDate         | DateTime?      | @map("start_date") @db.Timestamptz                            |                        |
| endDate           | DateTime?      | @map("end_date") @db.Timestamptz                              |                        |
| version           | Int?           | @default(1) @map("version")                                   |                        |
| createdAt         | DateTime       | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt         | DateTime       | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### UserVoucher

| Field       | Type     | Attributes                                                    | Description             |
| ----------- | -------- | ------------------------------------------------------------- | ----------------------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key             |
| userId      | String   | @map("user_id") @db.Uuid                                      | Foreign Key (User)      |
| promotionId | String   | @map("promotion_id") @db.Uuid                                 | Foreign Key (Promotion) |
| uniqueCode  | String?  | @unique @map("unique_code") @db.VarChar(20)                   |                         |
| isRedeemed  | Boolean? | @default(false) @map("is_redeemed")                           |                         |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                         |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                         |

### ReferralReward

| Field        | Type     | Attributes                                                    | Description            |
| ------------ | -------- | ------------------------------------------------------------- | ---------------------- |
| id           | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId   | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| referrerId   | String   | @map("referrer_id") @db.Uuid                                  | Foreign Key (User)     |
| refereeId    | String   | @map("referee_id") @db.Uuid                                   | Foreign Key (User)     |
| rewardStatus | String?  | @map("reward_status") @db.VarChar(20)                         |                        |
| rewardAmount | Decimal? | @map("reward_amount") @db.Decimal(10, 2)                      |                        |
| createdAt    | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt    | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### UserLoyaltyBalance

| Field          | Type     | Attributes                                                    | Description            |
| -------------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id             | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| userId         | String   | @map("user_id") @db.Uuid                                      | Foreign Key (User)     |
| businessId     | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| currentPoints  | Int?     | @default(0) @map("current_points")                            |                        |
| lifetimePoints | Int?     | @default(0) @map("lifetime_points")                           |                        |
| createdAt      | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt      | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### PromotionUsageLog

| Field                 | Type     | Attributes                                                    | Description             |
| --------------------- | -------- | ------------------------------------------------------------- | ----------------------- |
| id                    | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key             |
| promotionId           | String   | @map("promotion_id") @db.Uuid                                 | Foreign Key (Promotion) |
| orderId               | String   | @map("order_id") @db.Uuid                                     | Foreign Key (Order)     |
| userId                | String   | @map("user_id") @db.Uuid                                      | Foreign Key (User)      |
| discountAmountApplied | Decimal? | @map("discount_amount_applied") @db.Decimal(10, 2)            |                         |
| createdAt             | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                         |
| updatedAt             | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                         |

### ShopProduct

| Field            | Type     | Attributes                                                    | Description           |
| ---------------- | -------- | ------------------------------------------------------------- | --------------------- |
| id               | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key           |
| shopId           | String   | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)    |
| productId        | String   | @map("product_id") @db.Uuid                                   | Foreign Key (Product) |
| price            | Decimal  | @map("price") @db.Decimal(10, 2)                              |                       |
| marketingBadgeId | String?  | @map("marketing_badge_id") @db.Uuid                           |                       |
| isAvailable      | Boolean? | @default(true) @map("is_available")                           |                       |
| createdAt        | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                       |
| updatedAt        | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                       |
| version          | Int?     | @default(1) @map("version")                                   |                       |

### ShopOptionGroup

| Field             | Type     | Attributes                                                    | Description                      |
| ----------------- | -------- | ------------------------------------------------------------- | -------------------------------- |
| id                | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                      |
| shopId            | String   | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)               |
| groupId           | String   | @map("group_id") @db.Uuid                                     | Foreign Key (ProductOptionGroup) |
| isAvailable       | Boolean? | @default(true) @map("is_available")                           |                                  |
| minSelectOverride | Int?     | @map("min_select_override")                                   |                                  |
| maxSelectOverride | Int?     | @map("max_select_override")                                   |                                  |
| createdAt         | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                  |
| updatedAt         | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                  |
| version           | Int?     | @default(1) @map("version")                                   |                                  |

### ShopOptionChoice

| Field       | Type     | Attributes                                                    | Description                       |
| ----------- | -------- | ------------------------------------------------------------- | --------------------------------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                       |
| shopId      | String   | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)                |
| choiceId    | String   | @map("choice_id") @db.Uuid                                    | Foreign Key (ProductOptionChoice) |
| price       | Decimal  | @map("price") @db.Decimal(10, 2)                              |                                   |
| isAvailable | Boolean? | @default(true) @map("is_available")                           |                                   |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                   |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                   |
| version     | Int?     | @default(1) @map("version")                                   |                                   |

### ShopFulfillmentMethod

| Field               | Type     | Attributes                                                    | Description                                    |
| ------------------- | -------- | ------------------------------------------------------------- | ---------------------------------------------- |
| shopId              | String   | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop), Composite Key              |
| fulfillmentMethodId | String   | @map("fulfillment_method_id") @db.Uuid                        | Foreign Key (FulfillmentMethod), Composite Key |
| isEnabled           | Boolean? | @default(true) @map("is_enabled")                             |                                                |
| feePercentage       | Decimal? | @map("fee_percentage") @db.Decimal(5, 2)                      |                                                |
| createdAt           | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                                |
| updatedAt           | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                                |

### ShopProductBadge

| Field            | Type     | Attributes                                                    | Description                                 |
| ---------------- | -------- | ------------------------------------------------------------- | ------------------------------------------- |
| shopProductId    | String   | @map("shop_product_id") @db.Uuid                              | Foreign Key (ShopProduct), Composite Key    |
| marketingBadgeId | String   | @map("marketing_badge_id") @db.Uuid                           | Foreign Key (MarketingBadge), Composite Key |
| displayOrder     | Int?     | @default(0) @map("display_order")                             |                                             |
| createdAt        | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                             |
| updatedAt        | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                             |

### ShopOptionBadge

| Field              | Type     | Attributes                                                    | Description                                   |
| ------------------ | -------- | ------------------------------------------------------------- | --------------------------------------------- |
| shopOptionChoiceId | String   | @map("shop_option_choice_id") @db.Uuid                        | Foreign Key (ShopOptionChoice), Composite Key |
| marketingBadgeId   | String   | @map("marketing_badge_id") @db.Uuid                           | Foreign Key (MarketingBadge), Composite Key   |
| displayOrder       | Int?     | @default(0) @map("display_order")                             |                                               |
| createdAt          | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                               |
| updatedAt          | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                               |

### Order

| Field                | Type                 | Attributes                                                    | Description                     |
| -------------------- | -------------------- | ------------------------------------------------------------- | ------------------------------- |
| id                   | String               | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                     |
| businessId           | String               | @map("business_id") @db.Uuid                                  | Foreign Key (Business)          |
| shopId               | String               | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)              |
| userId               | String?              | @map("user_id") @db.Uuid                                      | Foreign Key (User)              |
| guestInfo            | Json?                | @map("guest_info")                                            |                                 |
| queueNumber          | Int                  | @map("queue_number")                                          |                                 |
| invoiceCode          | String               | @unique @map("invoice_code") @db.VarChar(30)                  |                                 |
| status               | OrderStatus          | @map("status")                                                | Enum                            |
| fulfillmentMethodId  | String               | @map("fulfillment_method_id") @db.Uuid                        | Foreign Key (FulfillmentMethod) |
| fulfillmentName      | Json?                | @map("fulfillment_name")                                      |                                 |
| fulfillmentCategory  | FulfillmentCategory? | @map("fulfillment_category")                                  | Enum                            |
| paymentMethodName    | Json?                | @map("payment_method_name")                                   |                                 |
| subtotal             | Decimal              | @map("subtotal") @db.Decimal(10, 2)                           |                                 |
| surchargeTotal       | Decimal              | @map("surcharge_total") @db.Decimal(10, 2)                    |                                 |
| discountTotal        | Decimal              | @map("discount_total") @db.Decimal(10, 2)                     |                                 |
| grandTotal           | Decimal              | @map("grand_total") @db.Decimal(10, 2)                        |                                 |
| createdAt            | DateTime             | @default(now()) @map("created_at") @db.Timestamptz            |                                 |
| updatedAt            | DateTime             | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                 |
| confirmedAt          | DateTime?            | @map("confirmed_at") @db.Timestamptz                          |                                 |
| preparationStartedAt | DateTime?            | @map("preparation_started_at") @db.Timestamptz                |                                 |
| readyAt              | DateTime?            | @map("ready_at") @db.Timestamptz                              |                                 |
| completedAt          | DateTime?            | @map("completed_at") @db.Timestamptz                          |                                 |
| cancelledAt          | DateTime?            | @map("cancelled_at") @db.Timestamptz                          |                                 |

### OrderItem

| Field         | Type     | Attributes                                                    | Description           |
| ------------- | -------- | ------------------------------------------------------------- | --------------------- |
| id            | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key           |
| orderId       | String   | @map("order_id") @db.Uuid                                     | Foreign Key (Order)   |
| productId     | String   | @map("product_id") @db.Uuid                                   | Foreign Key (Product) |
| productSku    | String   | @map("product_sku") @db.VarChar(50)                           |                       |
| productName   | Json     | @map("product_name")                                          |                       |
| quantity      | Int      | @map("quantity")                                              |                       |
| unitPrice     | Decimal  | @map("unit_price") @db.Decimal(10, 2)                         |                       |
| subtotal      | Decimal  | @map("subtotal") @db.Decimal(10, 2)                           |                       |
| discountTotal | Decimal? | @default(0) @map("discount_total") @db.Decimal(10, 2)         |                       |
| grandTotal    | Decimal  | @map("grand_total") @db.Decimal(10, 2)                        |                       |
| version       | Int?     | @default(1) @map("version")                                   |                       |
| createdAt     | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                       |
| updatedAt     | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                       |

### OrderItemOption

| Field         | Type     | Attributes                                                    | Description                       |
| ------------- | -------- | ------------------------------------------------------------- | --------------------------------- |
| id            | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                       |
| orderItemId   | String   | @map("order_item_id") @db.Uuid                                | Foreign Key (OrderItem)           |
| choiceId      | String   | @map("choice_id") @db.Uuid                                    | Foreign Key (ProductOptionChoice) |
| optionSku     | String   | @map("option_sku") @db.VarChar(50)                            |                                   |
| optionName    | Json     | @map("option_name")                                           |                                   |
| quantity      | Int      | @map("quantity")                                              |                                   |
| unitPrice     | Decimal  | @map("unit_price") @db.Decimal(10, 2)                         |                                   |
| subtotal      | Decimal  | @map("subtotal") @db.Decimal(10, 2)                           |                                   |
| discountTotal | Decimal? | @default(0) @map("discount_total") @db.Decimal(10, 2)         |                                   |
| grandTotal    | Decimal  | @map("grand_total") @db.Decimal(10, 2)                        |                                   |
| version       | Int?     | @default(1) @map("version")                                   |                                   |
| createdAt     | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                   |
| updatedAt     | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                   |

### OrderDiscount

| Field       | Type     | Attributes                                                    | Description             |
| ----------- | -------- | ------------------------------------------------------------- | ----------------------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key             |
| orderId     | String   | @map("order_id") @db.Uuid                                     | Foreign Key (Order)     |
| promotionId | String   | @map("promotion_id") @db.Uuid                                 | Foreign Key (Promotion) |
| name        | Json?    | @map("name")                                                  |                         |
| amount      | Decimal? | @map("amount") @db.Decimal(10, 2)                             |                         |
| version     | Int?     | @default(1) @map("version")                                   |                         |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                         |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                         |

### OrderItemDiscount

| Field       | Type     | Attributes                                                    | Description             |
| ----------- | -------- | ------------------------------------------------------------- | ----------------------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key             |
| orderItemId | String   | @map("order_item_id") @db.Uuid                                | Foreign Key (OrderItem) |
| promotionId | String   | @map("promotion_id") @db.Uuid                                 | Foreign Key (Promotion) |
| name        | Json?    | @map("name")                                                  |                         |
| amount      | Decimal? | @map("amount") @db.Decimal(10, 2)                             |                         |
| version     | Int?     | @default(1) @map("version")                                   |                         |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                         |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                         |

### OrderItemOptionDiscount

| Field             | Type     | Attributes                                                    | Description                   |
| ----------------- | -------- | ------------------------------------------------------------- | ----------------------------- |
| id                | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                   |
| orderItemOptionId | String   | @map("order_item_option_id") @db.Uuid                         | Foreign Key (OrderItemOption) |
| promotionId       | String   | @map("promotion_id") @db.Uuid                                 | Foreign Key (Promotion)       |
| name              | Json?    | @map("name")                                                  |                               |
| amount            | Decimal? | @map("amount") @db.Decimal(10, 2)                             |                               |
| version           | Int?     | @default(1) @map("version")                                   |                               |
| createdAt         | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                               |
| updatedAt         | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                               |

### OrderSurcharge

| Field             | Type     | Attributes                                                    | Description                   |
| ----------------- | -------- | ------------------------------------------------------------- | ----------------------------- |
| id                | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key                   |
| orderId           | String   | @map("order_id") @db.Uuid                                     | Foreign Key (Order)           |
| surchargeConfigId | String   | @map("surcharge_config_id") @db.Uuid                          | Foreign Key (SurchargeConfig) |
| name              | Json?    | @map("name")                                                  |                               |
| amount            | Decimal? | @map("amount") @db.Decimal(10, 2)                             |                               |
| isTax             | Boolean? | @default(false) @map("is_tax")                                |                               |
| version           | Int?     | @default(1) @map("version")                                   |                               |
| createdAt         | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                               |
| updatedAt         | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                               |

### Business

| Field          | Type            | Attributes                                                    | Description |
| -------------- | --------------- | ------------------------------------------------------------- | ----------- |
| id             | String          | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key |
| name           | Json            | @map("name")                                                  |             |
| description    | Json?           | @map("description")                                           |             |
| logoUrl        | String?         | @map("logo_url")                                              |             |
| bannerImageUrl | Json?           | @map("banner_image_url")                                      |             |
| supportEmail   | String?         | @map("support_email") @db.VarChar(100)                        |             |
| status         | BusinessStatus? | @default(PENDING) @map("status")                              | Enum        |
| createdAt      | DateTime        | @default(now()) @map("created_at") @db.Timestamptz            |             |
| updatedAt      | DateTime        | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |             |

### Role

| Field       | Type     | Attributes                                                    | Description            |
| ----------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId  | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| name        | Json     | @map("name")                                                  |                        |
| slug        | String   | @map("slug") @db.VarChar(50)                                  |                        |
| description | Json?    | @map("description")                                           |                        |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### Permission

| Field       | Type     | Attributes                                                    | Description |
| ----------- | -------- | ------------------------------------------------------------- | ----------- |
| id          | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key |
| slug        | String   | @unique @map("slug") @db.VarChar(50)                          |             |
| requiresPin | Boolean? | @default(false) @map("requires_pin")                          |             |
| createdAt   | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |             |
| updatedAt   | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |             |

### RolePermission

| Field        | Type     | Attributes                                                    | Description                             |
| ------------ | -------- | ------------------------------------------------------------- | --------------------------------------- |
| roleId       | String   | @map("role_id") @db.Uuid                                      | Foreign Key (Role), Composite Key       |
| permissionId | String   | @map("permission_id") @db.Uuid                                | Foreign Key (Permission), Composite Key |
| createdAt    | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                                         |
| updatedAt    | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                         |

### Staff

| Field           | Type     | Attributes                                                    | Description            |
| --------------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id              | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId      | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| globalRoleId    | String?  | @map("global_role_id") @db.Uuid                               | Foreign Key (Role)     |
| username        | String   | @unique @map("username") @db.VarChar(50)                      |                        |
| passwordHash    | String   | @map("password_hash")                                         |                        |
| fullName        | String?  | @map("full_name") @db.VarChar(100)                            |                        |
| phone           | String   | @map("phone") @db.VarChar(20)                                 |                        |
| profileImageUrl | String?  | @map("profile_image_url")                                     |                        |
| pinHash         | String?  | @map("pin_hash")                                              |                        |
| createdAt       | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt       | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### Shop

| Field          | Type     | Attributes                                                    | Description            |
| -------------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id             | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId     | String   | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| name           | Json     | @map("name")                                                  |                        |
| code           | String?  | @map("code") @db.VarChar(10)                                  |                        |
| description    | Json?    | @map("description")                                           |                        |
| imageUrl       | Json?    | @map("image_url")                                             |                        |
| bannerImageUrl | Json?    | @map("banner_image_url")                                      |                        |
| locationLat    | Decimal? | @map("location_lat") @db.Decimal(9, 6)                        |                        |
| locationLong   | Decimal? | @map("location_long") @db.Decimal(9, 6)                       |                        |
| openingHours   | Json?    | @map("opening_hours")                                         |                        |
| phoneContacts  | Json?    | @map("phone_contacts")                                        |                        |
| createdAt      | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt      | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### StaffShopAccess

| Field      | Type      | Attributes                                                    | Description                        |
| ---------- | --------- | ------------------------------------------------------------- | ---------------------------------- |
| staffId    | String    | @map("staff_id") @db.Uuid                                     | Foreign Key (Staff), Composite Key |
| shopId     | String    | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop), Composite Key  |
| roleId     | String?   | @map("role_id") @db.Uuid                                      | Foreign Key (Role)                 |
| validFrom  | DateTime? | @default(now()) @map("valid_from") @db.Timestamptz            |                                    |
| validUntil | DateTime? | @map("valid_until") @db.Timestamptz                           |                                    |
| createdAt  | DateTime  | @default(now()) @map("created_at") @db.Timestamptz            |                                    |
| updatedAt  | DateTime  | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                                    |

### StaffShift

| Field     | Type      | Attributes                                                    | Description         |
| --------- | --------- | ------------------------------------------------------------- | ------------------- |
| id        | String    | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key         |
| staffId   | String    | @map("staff_id") @db.Uuid                                     | Foreign Key (Staff) |
| shopId    | String    | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)  |
| shiftRole | String?   | @map("shift_role") @db.VarChar(20)                            |                     |
| startTime | DateTime? | @map("start_time") @db.Timestamptz                            |                     |
| endTime   | DateTime? | @map("end_time") @db.Timestamptz                              |                     |
| createdAt | DateTime  | @default(now()) @map("created_at") @db.Timestamptz            |                     |
| updatedAt | DateTime  | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                     |

### ShopReview

| Field     | Type      | Attributes                                                    | Description         |
| --------- | --------- | ------------------------------------------------------------- | ------------------- |
| id        | String    | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key         |
| shopId    | String    | @map("shop_id") @db.Uuid                                      | Foreign Key (Shop)  |
| userId    | String    | @map("user_id") @db.Uuid                                      | Foreign Key (User)  |
| orderId   | String    | @unique @map("order_id") @db.Uuid                             | Foreign Key (Order) |
| rating    | Int       | @map("rating")                                                |                     |
| comment   | String?   | @map("comment")                                               |                     |
| tags      | String[]  | @map("tags")                                                  |                     |
| replyText | String?   | @map("reply_text")                                            |                     |
| replyAt   | DateTime? | @map("reply_at") @db.Timestamptz                              |                     |
| isPublic  | Boolean?  | @default(true) @map("is_public")                              |                     |
| createdAt | DateTime  | @default(now()) @map("created_at") @db.Timestamptz            |                     |
| updatedAt | DateTime  | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                     |

### ProductReview

| Field        | Type     | Attributes                                                    | Description              |
| ------------ | -------- | ------------------------------------------------------------- | ------------------------ |
| id           | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key              |
| shopReviewId | String   | @map("shop_review_id") @db.Uuid                               | Foreign Key (ShopReview) |
| productId    | String   | @map("product_id") @db.Uuid                                   | Foreign Key (Product)    |
| rating       | Int      | @map("rating")                                                |                          |
| comment      | String?  | @map("comment")                                               |                          |
| createdAt    | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                          |
| updatedAt    | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                          |

### MobileAppVersion

| Field            | Type     | Attributes                                                    | Description |
| ---------------- | -------- | ------------------------------------------------------------- | ----------- |
| id               | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key |
| platform         | String   | @map("platform") @db.VarChar(20)                              |             |
| latestVersion    | String   | @map("latest_version") @db.VarChar(50)                        |             |
| minUsableVersion | String   | @map("min_usable_version") @db.VarChar(50)                    |             |
| updateUrl        | String   | @map("update_url")                                            |             |
| message          | Json?    | @map("message")                                               |             |
| createdAt        | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |             |
| updatedAt        | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |             |

### FulfillmentMethod

| Field      | Type                | Attributes                                                    | Description            |
| ---------- | ------------------- | ------------------------------------------------------------- | ---------------------- |
| id         | String              | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId | String?             | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| slug       | String              | @map("slug") @db.VarChar(50)                                  |                        |
| name       | Json                | @map("name")                                                  |                        |
| imageUrl   | String?             | @map("image_url")                                             |                        |
| category   | FulfillmentCategory | @map("category")                                              | Enum                   |
| isSystem   | Boolean?            | @default(false) @map("is_system")                             |                        |
| isActive   | Boolean?            | @default(true) @map("is_active")                              |                        |
| createdAt  | DateTime            | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt  | DateTime            | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### UnitOfMeasure

| Field          | Type     | Attributes                                                    | Description            |
| -------------- | -------- | ------------------------------------------------------------- | ---------------------- |
| id             | String   | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId     | String?  | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| name           | Json     | @map("name")                                                  |                        |
| symbol         | Json     | @map("symbol")                                                |                        |
| type           | String?  | @map("type") @db.VarChar(20)                                  |                        |
| baseMultiplier | Decimal? | @default(1) @map("base_multiplier") @db.Decimal(10, 4)        |                        |
| createdAt      | DateTime | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt      | DateTime | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### Announcement

| Field          | Type                       | Attributes                                                    | Description            |
| -------------- | -------------------------- | ------------------------------------------------------------- | ---------------------- |
| id             | String                     | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key            |
| businessId     | String                     | @map("business_id") @db.Uuid                                  | Foreign Key (Business) |
| title          | String                     | @map("title") @db.VarChar(255)                                |                        |
| content        | String                     | @map("content")                                               |                        |
| imageUrl       | String?                    | @map("image_url")                                             |                        |
| targetAudience | AnnouncementTargetAudience | @map("target_audience")                                       | Enum                   |
| priority       | AnnouncementPriority       | @default(NORMAL) @map("priority")                             | Enum                   |
| isActive       | Boolean                    | @default(true) @map("is_active")                              |                        |
| publishedAt    | DateTime                   | @default(now()) @map("published_at") @db.Timestamptz          |                        |
| createdAt      | DateTime                   | @default(now()) @map("created_at") @db.Timestamptz            |                        |
| updatedAt      | DateTime                   | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                        |

### Notification

| Field     | Type             | Attributes                                                    | Description        |
| --------- | ---------------- | ------------------------------------------------------------- | ------------------ |
| id        | String           | @id @default(uuid(7)) @map("id") @db.Uuid                     | Primary Key        |
| userId    | String           | @map("user_id") @db.Uuid                                      | Foreign Key (User) |
| title     | String           | @map("title") @db.VarChar(255)                                |                    |
| body      | String           | @map("body")                                                  |                    |
| type      | NotificationType | @map("type")                                                  | Enum               |
| metadata  | Json?            | @map("metadata")                                              |                    |
| isRead    | Boolean          | @default(false) @map("is_read")                               |                    |
| readAt    | DateTime?        | @map("read_at") @db.Timestamptz                               |                    |
| createdAt | DateTime         | @default(now()) @map("created_at") @db.Timestamptz            |                    |
| updatedAt | DateTime         | @default(now()) @updatedAt @map("updated_at") @db.Timestamptz |                    |
