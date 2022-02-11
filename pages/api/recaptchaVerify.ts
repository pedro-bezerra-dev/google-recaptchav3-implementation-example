import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY ? process.env.RECAPTCHA_SECRET_KEY : ''
  const { token } = JSON.parse(req.body)
  const endpoint = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`
  
  if(req.method === 'POST') {
    try {
      const result = await fetch(
        endpoint,
        {
          method: 'POST',
        }
      ).then(res => res.json())

      if(!result.success) throw new Error

      res.status(200).json(result)
    } catch(error) {
      res.status(417)
    }
  }
}