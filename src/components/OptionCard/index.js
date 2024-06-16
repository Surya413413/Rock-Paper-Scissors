import './index.css'

const OptionCard = props => {
  const {optionItems, onClickUserView} = props
  const {imageUrl, id} = optionItems

  const onClickId = () => {
    onClickUserView(id)
  }
  return (
    <div className="three-buttons-container">
      <button
        type="button"
        className="three-button"
        onClick={onClickId}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <img src={imageUrl} className="image-edit" alt={id} />
      </button>
    </div>
  )
}
export default OptionCard
