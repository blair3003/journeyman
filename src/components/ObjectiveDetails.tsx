interface ObjectiveDetailsProps {
    objective: Objective
}

const ObjectiveDetails = ({ objective }: ObjectiveDetailsProps) => {

    return (<>{objective.title}</>)
}

export default ObjectiveDetails