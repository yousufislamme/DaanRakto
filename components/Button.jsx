
const Button = ({buttonTitle, onClick, className}) => {
  return (

     <button className={`${className} px-6 py-3 rounded-lg border-[1px] font-semibold`} onClick={onClick}>{buttonTitle}</button>
)
}

export default Button