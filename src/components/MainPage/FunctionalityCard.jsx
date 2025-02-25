function FunctionalityCard({text, image}) {
    return (
        <div className="functionalityCard">
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
            <img src={image} />
        </div>
    )
}

export default FunctionalityCard