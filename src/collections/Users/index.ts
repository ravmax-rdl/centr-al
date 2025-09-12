import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrModerator } from '@/access/isAdminorModerator';
import { protectRoles } from './hooks/protectRoles';
import { getServerSideURL } from '@/utilities/getURL';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: anyone,
    delete: isAdmin,
    read: authenticated,
    update: isAdminOrModerator,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 12 * 60 * 60,
    verify: {
      generateEmailSubject: (args) => {
        return `Hey ${args.user.firstName ? args.user.firstName : args.user.email}, verify your email address`;
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Hey ${args.user.firstName ? args.user.firstName : args.user.email}!</h1>
        <br/>
        <p>Please verify your email address by going to <a href="${getServerSideURL()}/verify?token=${args.token}">${getServerSideURL()}/verify?token=${args.token}</a></p>
        </div>`;
      },
    }, // Only verify email if SMTP is configured
    forgotPassword: {
      generateEmailSubject: (args) => {
        return `Hey ${args?.user.firstName ? args?.user.firstName : args?.user.email}, reset your password`;
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Hey ${args?.user.firstName ? args?.user.firstName : args?.user.email}!</h1>
        <br/>
        <p>You (or someone) requested to reset your password. If this wasn't you, you can safely ignore this email. Otherwise, reset your password by going to <a href="${getServerSideURL()}/password-reset?token=${args?.token}">${getServerSideURL()}/password-reset?token=${args?.token}</a></p>
        </div>`;
      },
    }, // Only verify email if SMTP is configured
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      saveToJWT: true,
      hasMany: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Moderator', value: 'moderator' },
        { label: 'Author', value: 'author' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: ['user'],
      required: true,
      access: {
        update: isAdminFieldLevel,
      },
      hooks: {
        beforeChange: [protectRoles],
      },
    },
  ],
  timestamps: true,
};
