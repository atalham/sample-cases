import { resetNavigation } from '@utils';
import { Button, FormControl, Input } from 'native-base';
import React, { useState } from 'react';

// Define the FormComponent outside of your useForm hook
const FormComponent = ({
  state,
  setState,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <FormControl key="btm">
    <Input
      key="atm2"
      isRequired
      type="text"
      onChangeText={setState}
      autoCorrect={false}
      defaultValue={state}
      onBlur={() => console.log('blurred')}
      keyboardType="email-address"
      borderRadius="md"
      borderWidth="3"
      height="12"
      width="80"
      borderColor="primary.700"
      _input={{ color: 'white', fontSize: '16', fontWeight: '700' }}
    />
    <FormControl.HelperText _text={{ color: 'primary.700' }}>
      Spamlamayacağımıza söz veriyoruz
    </FormControl.HelperText>
    {/* <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} size="2" name="stop-circle" />}>
      At least 6 characters are required.
    </FormControl.ErrorMessage> */}
    <Button
      mt="16"
      _text={{ color: 'white', fontSize: '16', fontWeight: '700' }}
      height="12"
      width="80"
      backgroundColor="primary.700"
      _pressed={{ bg: 'primary.500' }}
      onPress={() => resetNavigation('Home')}
    >
      Submit
    </Button>
  </FormControl>
);

export default function useForm(defaultState: string) {
  const [state, setState] = useState(defaultState);
  return [state, <FormComponent key="atm" state={state} setState={setState} />, setState];
}
