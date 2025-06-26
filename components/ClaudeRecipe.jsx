import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {

    return(
        <section className="suggested-rercipe-container" aria-live="polite">
            <h2>Chef Claude Reccomends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )}



