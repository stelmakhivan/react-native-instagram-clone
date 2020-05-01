import React from 'react'
import SearchPresenter from './SearchPresenter'

export default class SearchContainer extends React.PureComponent {
  state = {
    term: '',
    shouldFetch: false,
  }

  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
    })
  }

  onChange = (text) => {
    const { navigation } = this.props
    this.setState({ term: text, shouldFetch: false })
    navigation.setParams({
      term: text,
    })
  }
  onSubmit = () => {
    this.setState({ shouldFetch: true })
  }
  render() {
    const { term, shouldFetch } = this.state
    return <SearchPresenter term={term} shouldFetch={shouldFetch} />
  }
}
