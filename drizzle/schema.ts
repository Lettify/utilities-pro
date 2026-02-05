import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
const nutritionalObjectiveEnum = pgEnum("nutritional_objective", [
  "energia",
  "imunidade",
  "coracao",
  "cerebro",
  "pele",
  "geral",
]);
const discountTypeEnum = pgEnum("discount_type", ["percentage", "fixed"]);
const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);
const paymentMethodEnum = pgEnum("payment_method", [
  "pix",
  "credit_card",
  "debit_card",
]);
const paymentGatewayEnum = pgEnum("payment_gateway", ["mercadopago", "efi"]);
const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "processing",
  "approved",
  "rejected",
  "refunded",
]);
const deliveryProviderEnum = pgEnum("delivery_provider", [
  "uber_direct",
  "ifood",
  "correios",
  "local",
]);
const bannerPositionEnum = pgEnum("banner_position", [
  "hero",
  "collection",
  "promo",
]);
const settingTypeEnum = pgEnum("setting_type", [
  "string",
  "number",
  "boolean",
  "json",
]);
const contactStatusEnum = pgEnum("contact_status", [
  "new",
  "read",
  "replied",
  "archived",
]);

// ==================== USERS ====================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ==================== CATEGORIES ====================
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  displayOrder: integer("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

// ==================== PRODUCTS ====================
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description"),
  shortDescription: text("shortDescription"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compareAtPrice", { precision: 10, scale: 2 }),
  costPrice: numeric("costPrice", { precision: 10, scale: 2 }),
  sku: varchar("sku", { length: 50 }),
  barcode: varchar("barcode", { length: 50 }),
  stock: integer("stock").default(0).notNull(),
  lowStockThreshold: integer("lowStockThreshold").default(5),
  weight: numeric("weight", { precision: 8, scale: 2 }),
  categoryId: integer("categoryId"),
  nutritionalObjective: nutritionalObjectiveEnum("nutritionalObjective"),
  nutritionalInfo: jsonb("nutritionalInfo"),
  harmonization: text("harmonization"),
  origin: varchar("origin", { length: 100 }),
  isActive: boolean("isActive").default(true),
  isFeatured: boolean("isFeatured").default(false),
  isLimitedEdition: boolean("isLimitedEdition").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// ==================== PRODUCT IMAGES ====================
export const productImages = pgTable("productImages", {
  id: serial("id").primaryKey(),
  productId: integer("productId").notNull(),
  url: text("url").notNull(),
  fileKey: varchar("fileKey", { length: 255 }),
  alt: varchar("alt", { length: 200 }),
  isMacro: boolean("isMacro").default(false),
  displayOrder: integer("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProductImage = typeof productImages.$inferSelect;
export type InsertProductImage = typeof productImages.$inferInsert;

// ==================== ADDRESSES ====================
export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  label: varchar("label", { length: 50 }),
  recipientName: varchar("recipientName", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  street: varchar("street", { length: 200 }).notNull(),
  number: varchar("number", { length: 20 }).notNull(),
  complement: varchar("complement", { length: 100 }),
  neighborhood: varchar("neighborhood", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zipCode: varchar("zipCode", { length: 10 }).notNull(),
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Address = typeof addresses.$inferSelect;
export type InsertAddress = typeof addresses.$inferInsert;

// ==================== PAYMENT METHODS ====================
export const paymentMethods = pgTable("paymentMethods", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  brand: varchar("brand", { length: 50 }).notNull(),
  cardholder: varchar("cardholder", { length: 120 }).notNull(),
  last4: varchar("last4", { length: 4 }).notNull(),
  expMonth: varchar("expMonth", { length: 2 }).notNull(),
  expYear: varchar("expYear", { length: 4 }).notNull(),
  provider: varchar("provider", { length: 40 }),
  providerToken: varchar("providerToken", { length: 255 }),
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type PaymentMethod = typeof paymentMethods.$inferSelect;
export type InsertPaymentMethod = typeof paymentMethods.$inferInsert;

// ==================== WISHLIST ====================
export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  productId: integer("productId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Wishlist = typeof wishlist.$inferSelect;
export type InsertWishlist = typeof wishlist.$inferInsert;

// ==================== CART ====================
export const cartItems = pgTable("cartItems", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  productId: integer("productId").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

// ==================== COUPONS ====================
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  discountType: discountTypeEnum("discountType").notNull(),
  discountValue: numeric("discountValue", { precision: 10, scale: 2 }).notNull(),
  minOrderValue: numeric("minOrderValue", { precision: 10, scale: 2 }),
  maxUses: integer("maxUses"),
  usedCount: integer("usedCount").default(0),
  validFrom: timestamp("validFrom"),
  validUntil: timestamp("validUntil"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = typeof coupons.$inferInsert;

// ==================== ORDERS ====================
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("orderNumber", { length: 20 }).notNull().unique(),
  userId: integer("userId").notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 10, scale: 2 }).default("0"),
  shippingCost: numeric("shippingCost", { precision: 10, scale: 2 }).default("0"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  couponId: integer("couponId"),
  couponCode: varchar("couponCode", { length: 50 }),
  paymentMethod: paymentMethodEnum("paymentMethod"),
  paymentGateway: paymentGatewayEnum("paymentGateway"),
  paymentStatus: paymentStatusEnum("paymentStatus").default("pending"),
  paymentId: varchar("paymentId", { length: 100 }),
  paymentDetails: jsonb("paymentDetails"),
  shippingAddressId: integer("shippingAddressId"),
  shippingAddress: jsonb("shippingAddress"),
  deliveryProvider: deliveryProviderEnum("deliveryProvider"),
  deliveryId: varchar("deliveryId", { length: 100 }),
  deliveryDetails: jsonb("deliveryDetails"),
  trackingCode: varchar("trackingCode", { length: 100 }),
  estimatedDelivery: timestamp("estimatedDelivery"),
  deliveredAt: timestamp("deliveredAt"),
  notes: text("notes"),
  invoiceNumber: varchar("invoiceNumber", { length: 50 }),
  invoiceUrl: text("invoiceUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// ==================== ORDER ITEMS ====================
export const orderItems = pgTable("orderItems", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId").notNull(),
  productId: integer("productId").notNull(),
  productName: varchar("productName", { length: 200 }).notNull(),
  productSku: varchar("productSku", { length: 50 }),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unitPrice", { precision: 10, scale: 2 }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

// ==================== TESTIMONIALS ====================
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  customerName: varchar("customerName", { length: 100 }).notNull(),
  customerLocation: varchar("customerLocation", { length: 100 }),
  customerAvatar: text("customerAvatar"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  isActive: boolean("isActive").default(true),
  displayOrder: integer("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// ==================== BANNERS ====================
export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }),
  subtitle: text("subtitle"),
  imageUrl: text("imageUrl").notNull(),
  mobileImageUrl: text("mobileImageUrl"),
  linkUrl: text("linkUrl"),
  buttonText: varchar("buttonText", { length: 50 }),
  position: bannerPositionEnum("position").default("hero"),
  displayOrder: integer("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  validFrom: timestamp("validFrom"),
  validUntil: timestamp("validUntil"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Banner = typeof banners.$inferSelect;
export type InsertBanner = typeof banners.$inferInsert;

// ==================== FAQ ====================
export const faqItems = pgTable("faqItems", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 50 }),
  displayOrder: integer("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type FaqItem = typeof faqItems.$inferSelect;
export type InsertFaqItem = typeof faqItems.$inferInsert;

// ==================== STORE SETTINGS ====================
export const storeSettings = pgTable("storeSettings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  type: settingTypeEnum("type").default("string"),
  description: text("description"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type StoreSetting = typeof storeSettings.$inferSelect;
export type InsertStoreSetting = typeof storeSettings.$inferInsert;

// ==================== CONTACT MESSAGES ====================
export const contactMessages = pgTable("contactMessages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  status: contactStatusEnum("status").default("new"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
