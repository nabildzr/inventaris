
interface Props {
  children: React.ReactNode
}

const ReactNode = ({children}: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ReactNode
