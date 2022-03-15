import htmlpdf from 'html-pdf'
export default async function handler(
  req,
  res
) {
  if (req.method === 'POST') {
    const htmlString = req.body.htmlString

    try {
    htmlpdf.create(htmlString, { "width": "100px", }).toBuffer(function(err, buffer){
      res.status(200).json({pdf: `data:application/pdf;base64,${buffer.toString('base64')}`})
    });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
