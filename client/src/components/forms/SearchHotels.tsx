import React, { useState } from 'react'
import { DatePicker, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AlgoliaPlaces from 'algolia-places-react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

// destructure values from ant components
const { RangePicker } = DatePicker
const { Option } = Select

const config = {
  appId: import.meta.env.VITE_APP_ALGOLIA_APP_ID,
  apiKey: import.meta.env.VITE_APP_ALGOLIA_API_KEY,
  language: 'en'
  // countries: ["au"],
}

const Search = () => {
  // state
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [bed, setBed] = useState('')
  // route
  const history = useHistory()

  const handleSubmit = () => {
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`)
  }

  return (
    <div className="flex p-4 mb-4 h-[50px] gap-[10px] items-stretch">
      <div className="h-full flex-1">
        <AlgoliaPlaces
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{
            width: '100%',
            height: '50px',
            borderRadius: '10px',
            border: '1px',
            borderColor: 'black'
          }}
        />
      </div>

      <RangePicker
        onChange={(value, dateString) => setDate(dateString)}
        disabledDate={current =>
          current && current.valueOf() < moment().subtract(1, 'days').valueOf()
        }
        className="flex-1"
        style={{
          height: '50px',
          borderRadius: '10px',
          border: '1px',
          borderColor: 'black'
        }}
      />

      <Select
        className="flex-1"
        onChange={value => setBed(value)}
        size="large"
        placeholder="Number of beds"
        style={{ height: '50px', borderRadius: '20px', border: '1px' }}
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square h-[50px]"
      />
    </div>
  )
}

export default Search
