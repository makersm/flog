import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

class CustomDocument extends Document {
    static getInitialProps({ renderPage }) {
        const { html, head, errorHtml, chunks } = renderPage()
        const styles = flush()
        return { html, head, errorHtml, chunks, styles }
    }

    render() {
        return (
            <html>
                <Head>
                    <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'/>
                    <link rel="stylesheet" href="/static/github-markdown.css"/>

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
                    <Main />
                    <NextScript />
                </body>
                <script
                    src="https://code.jquery.com/jquery-3.2.1.min.js"
                    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
                    crossOrigin="anonymous"></script>
            </html>
        )
    }
}

export default CustomDocument