import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, numeric, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoURL: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const investments = pgTable('investments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  symbol: text('symbol').notNull(), // e.g., "BTC", "ITUB4", "AAPL"
  name: text('name').notNull(),
  type: text('type').notNull(), // "crypto", "stock_br", "stock_us", "fii", "gold"
  quantity: numeric('quantity', { precision: 15, scale: 6 }).default('0').notNull(),
  averagePrice: numeric('average_price', { precision: 15, scale: 2 }).default('0').notNull(),
  currency: text('currency').default('BRL').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(), // e.g., "Checking", "Savings", "Wallet"
  bank: text('bank'), // e.g., "nubank", "inter", "itau", etc.
  type: text('type').notNull(), // "bank", "credit", "cash", "investment"
  balance: numeric('balance', { precision: 15, scale: 2 }).default('0.00').notNull(),
  currency: text('currency').default('BRL').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id), // null for global categories
  name: text('name').notNull(),
  type: text('type').notNull(), // "income", "expense"
  icon: text('icon'),
  color: text('color'),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  accountId: integer('account_id').references(() => accounts.id).notNull(),
  categoryId: integer('category_id').references(() => categories.id).notNull(),
  groupId: integer('group_id').references(() => groups.id),
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  type: text('type').notNull(), // "income", "expense"
  description: text('description'),
  date: timestamp('date').defaultNow().notNull(),
  isRecurring: boolean('is_recurring').default(false),
  recurringPeriod: text('recurring_period'), // "daily", "weekly", "monthly", "yearly"
  createdAt: timestamp('created_at').defaultNow(),
});

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdBy: integer('created_by').references(() => users.id).notNull(),
  inviteCode: text('invite_code').unique(),
  password: text('password'), // New password field
  isPrivate: boolean('is_private').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const groupPosts = pgTable('group_posts', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id').references(() => groups.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userGroups = pgTable('user_groups', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  groupId: integer('group_id').references(() => groups.id).notNull(),
  role: text('role').default('member').notNull(), // "admin", "member"
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const stockProjections = pgTable('stock_projections', {
  id: serial('id').primaryKey(),
  symbol: text('symbol').notNull(),
  projection: text('projection').notNull(), // AI generated text
  sentiment: text('sentiment'), // "bullish", "bearish", "neutral"
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const financialNews = pgTable('financial_news', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  url: text('url'),
  publishedAt: timestamp('published_at'),
});

export const googleSheetsSync = pgTable('google_sheets_sync', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  spreadsheetId: text('spreadsheet_id').notNull(),
  lastSync: timestamp('last_sync'),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  transactions: many(transactions),
  googleSheetsSyncs: many(googleSheetsSync),
  userGroups: many(userGroups),
  createdGroups: many(groups),
  groupPosts: many(groupPosts),
}));

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, { fields: [transactions.userId], references: [users.id] }),
  account: one(accounts, { fields: [transactions.accountId], references: [accounts.id] }),
  category: one(categories, { fields: [transactions.categoryId], references: [categories.id] }),
  group: one(groups, { fields: [transactions.groupId], references: [groups.id] }),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  creator: one(users, { fields: [groups.createdBy], references: [users.id] }),
  members: many(userGroups),
  transactions: many(transactions),
  posts: many(groupPosts),
}));

export const groupPostsRelations = relations(groupPosts, ({ one }) => ({
  user: one(users, { fields: [groupPosts.userId], references: [users.id] }),
  group: one(groups, { fields: [groupPosts.groupId], references: [groups.id] }),
}));

export const userGroupsRelations = relations(userGroups, ({ one }) => ({
  user: one(users, { fields: [userGroups.userId], references: [users.id] }),
  group: one(groups, { fields: [userGroups.groupId], references: [groups.id] }),
}));
