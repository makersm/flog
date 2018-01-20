import Document, {Head, Main, NextScript} from 'next/document'
import flush from 'styled-jsx/server'

class CustomDocument extends Document {
    static getInitialProps({renderPage}) {
        const {html, head, errorHtml, chunks} = renderPage()
        const styles = flush()
        return {html, head, errorHtml, chunks, styles}
    }

    render() {
        return (
            <html>
            <Head>
                <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'/>
                <link rel="stylesheet" href="/static/github-markdown.css"/>
                <link href="https://fonts.googleapis.com/css?family=Kalam" rel="stylesheet"/>

                <style>{`
                        .markdown-body {
                            box-sizing: border-box;
                            min-width: 200px;
                            max-width: 980px;
                            margin: 0 auto;
                            padding: 45px;
                        }

                        @media (max-width: 767px) {
                            .markdown-body {
                            padding: 15px;
                            }
                        }

                        a {
		                    color: black;
		                }
                    `}</style>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}

export default CustomDocument