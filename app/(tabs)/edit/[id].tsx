import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useNoteStore } from '@/store/noteStore'
import { defaultStyles } from '@/constants/Styles';
import tw from 'twrnc';
import Colors from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';


const editNote = () => {
    const router = useRouter();

    const { id } = useLocalSearchParams();
    const { name, notes, updateNote } = useNoteStore();

    const note = notes.find((note) => note.id === id);

    if (!note) {
        router.replace('/notes')
        return
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

    const [titleInput, setTitleInput] = React.useState(note?.title);
    const [contentInput, setContentInput] = React.useState(note?.content);

    const editNote = () => {
        updateNote({ ...note, title: titleInput, content: contentInput })
        setTitleInput('')
        setContentInput('')
        Alert.alert(
            'Note Edited!',
            'Your note has edited successfully.',
        )
        router.replace('/notes')
    }

    return (
        <View>
            <Text style={[defaultStyles.sectionHeader, { marginTop: 50 }]}>
                Hello! {name}
            </Text>

            <View style={tw`bg-gray-100 h-full p-4 w-full`}>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-4xl font-bold`}>Edit Note.</Text>
                </View>

                <View style={tw`h-[1px] bg-slate-500 my-1 w-full`} />

                <KeyboardAvoidingView
                    keyboardVerticalOffset={keyboardVerticalOffset}
                    style={{ flex: 1 }}
                    behavior={(Platform.OS === 'ios') ? "padding" : undefined}
                    key="addnote"
                >
                    <View style={defaultStyles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.smolInput, { flex: 1 }]}
                                placeholder="Please enter a title."
                                keyboardType='default'
                                value={titleInput}
                                onChangeText={setTitleInput}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.bigInput, {
                                    flex: 1,
                                    alignContent: 'flex-start',
                                    verticalAlign: 'top'
                                }]}
                                placeholder="Please enter your note here."
                                keyboardType='default'
                                value={contentInput}
                                onChangeText={setContentInput}
                            />
                        </View>

                        <TouchableOpacity
                            style={[defaultStyles.pillButton, { backgroundColor: titleInput == '' ? Colors.primaryMuted : Colors.primary, marginBottom: 20 }]}
                            disabled={titleInput == ''}
                            onPress={editNote}
                        >
                            <Text style={defaultStyles.buttonText}>Edit.</Text>
                        </TouchableOpacity>
                    </View >

                </KeyboardAvoidingView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    smolInput: {
        backgroundColor: Colors.lightGray,
        padding: 15,
        borderRadius: 16,
        fontSize: 18,
        marginRight: 10
    },
    bigInput: {
        backgroundColor: Colors.lightGray,
        padding: 15,
        borderRadius: 16,
        fontSize: 18,
        marginRight: 10,
        height: 200
    }
})

export default editNote