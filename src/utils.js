import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '.env') })

import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import { adjectives, nouns } from './words'

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length)
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}

export const sendSecretMail = (address, secret) => {
  const email = {
    from: `React Native Instagram Clone <${process.env.GOOGLE_ACCOUNT}>`,
    to: address,
    subject: 'Login Secret for React Native Instagram Clone',
    html: `Hello! Your login secret is ${secret}<br/>Copy paste on the app/website to log in`
  }

  return sgMail.send(email)
}
