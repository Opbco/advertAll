import React from 'react';
import { 
  StyleSheet,
  TextInput
} from 'react-native';
import { ThemedText } from '@components/ThemedText';
import { ThemedView } from '@components/ThemedView';

const CustomInput = ({ 
    field, 
    form, 
    placeholder, 
    secureTextEntry,
    ...props 
  }) => {
    const errorMessage = form.touched[field.name] && form.errors[field.name];
    
    return (
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            errorMessage && styles.inputError
          ]}
          onChangeText={form.handleChange(field.name)}
          onBlur={form.handleBlur(field.name)}
          value={field.value}
          placeholder={placeholder}
          placeholderTextColor="#666"
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          {...props}
        />
        {errorMessage && (
          <ThemedText type="error">{errorMessage}</ThemedText>
        )}
      </ThemedView>
    );
  };

  const styles = StyleSheet.create({
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: '#f8f8f8',
    },
    inputError: {
      borderColor: '#ff3b30',
    },
  });

  export default CustomInput;