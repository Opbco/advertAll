import { StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";

const DecisionScreen = () => {
    const {id} = useLocalSearchParams();
  return (
    <ThemedView>
      <ThemedText type="title">Decision {id} - Screen</ThemedText>
    </ThemedView>
  )
}

export default DecisionScreen

const styles = StyleSheet.create({})