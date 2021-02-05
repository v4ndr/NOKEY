import * as React from 'react'
import {Button} from 'react-native-elements'
import {useRoute} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {Icon} from 'react-native-elements'


const ToggleButton = ({toggled}) => {
    const route = useRoute()
    const dispatch = useDispatch();

    return(
    <Button
      buttonStyle={{
        backgroundColor:'white',
        marginRight:5
      }}
      icon={
        <Icon
          name={'bookmark'}
          type={'font-awesome-5'}
          size={20}
          solid={toggled}
        />
        }
        onPress={()=>{
          dispatch({type: "TOGGLE_SETLIST", value: route.params.id}) 
      }
        }
    />
    )
}

export default ToggleButton