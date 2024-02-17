import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../utils/HomeScreenStyles';
import {COLORS} from '../utils/appContants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Checkbox from '@react-native-community/checkbox';
import {SvgXml} from 'react-native-svg';
import {todoSvg} from '../assets/svgs/todoSvg';
const HomeScreen = () => {
  const [todos, setTodos] = useState<any>([]);
  const [textInput, setTextInput] = useState('');
  const [searchTxt, setSearchTxt] = useState('');
  const [activeFilter, setActiveFilter] = useState('All To-dos');
  const [Loading, setLoading] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const [open, setOpen] = useState(false);
  const [formattedDate, setformattedDate] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);
  const FilterButtons = [
    {
      id: 1,
      title: 'All To-dos',
    },
    {
      id: 2,
      title: 'Completed',
    },
    {
      id: 3,
      title: 'InCompleted',
    },
  ];
  const handleDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    setDate(dateObject);

    const NewDate = moment(dateObject);

    const currentDate = moment();

    let formattedDate: any = '';

    if (currentDate.isSame(NewDate, 'day')) {
      formattedDate = 'Today ' + NewDate.format('hh:mm A');
    } else {
      formattedDate = NewDate.format('MMMM DD, YYYY hh:mm A');
    }
    setformattedDate(formattedDate);
    setOpen(false);
  };

  const handleFilterPress = (filterTitle: any) => {
    setActiveFilter(filterTitle);
  };

  const markTodoComplete = (todoId: number, completed: boolean) => {
    const newTodosItem = todos.map((item: any) => {
      if (item.id === todoId) {
        return {...item, completed}; // Update the completed status
      }
      return item;
    });

    setTodos(newTodosItem);
  };
  const handleCheckboxToggle = (todo: any, completed: boolean) => {
    markTodoComplete(todo.id, completed);
  };
  const handleSearchChange = (text: any) => {
    setSearchTxt(text);
  };

  const deleteTodo = (todoId: number) => {
    // Find the index of the todo with the specified id
    const index = todos.findIndex((item: any) => item.id === todoId);

    if (index !== -1) {
      const updatedTodos = [
        ...todos.slice(0, index),
        ...todos.slice(index + 1),
      ];

      setTodos(updatedTodos);

      saveData(updatedTodos);
    }
  };

  const clearAllTodos = () => {
    if (todos.length === 0) {
      Alert.alert('Alert', 'Nothing to clear');
      return;
    }
    Alert.alert('Confirm', 'Are you sure to clear all todos?', [
      {
        text: 'Yes',
        onPress: () => {
          setTodos([]), saveData([]);
        },
      },
      {
        text: 'No',
      },
    ]);
  };
  const loadData = async () => {
    setLoading(true);
    try {
      const savedTodosString: any = await AsyncStorage.getItem('Data');

      if (savedTodosString !== null) {
        setLoading(false);

        const parseData: any = JSON.parse(savedTodosString);

        setTodos(parseData);
      }
    } catch (error) {
      setLoading(false);

      console.error('Error loading todos:', error);
    }
  };

  const saveData = async (todos: any) => {
    try {
      await AsyncStorage.setItem('Data', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    if (todos && todos.length > 0) {
      saveData(todos);
    }
  }, [todos]);

  useEffect(() => {
    loadData();
  }, []);

  const addTodo = () => {
    if (textInput === '') {
      Alert.alert('Alert', 'Please enter a to-do');
      return;
    } else if (formattedDate === '') {
      Alert.alert('Alert', 'Please Select a due date.');
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      task: textInput,
      completed: false,
      dueDate: formattedDate,
    };

    setTodos([...todos, newTodo]);
    setTextInput('');
    setformattedDate('');
  };

  const ListItem = ({todo}: any) => {
    const [dateString, timeString] = todo.dueDate.split(' ');
    let isPastDue = false;
    if (dateString === 'Today') {
      const combinedDateTimeString =
        moment().format('YYYY-MM-DD') + ' ' + timeString;
      const NewDate = moment(combinedDateTimeString, 'YYYY-MM-DD hh:mm A');
      isPastDue = NewDate.isBefore(moment());
    } else {
      const NewDate = moment(todo.dueDate, 'MMMM DD, YYYY hh:mm A');
      isPastDue = NewDate.isBefore(moment());
    }
    return (
      <View style={styles.listItem}>
        <Checkbox
          value={todo.completed}
          onValueChange={completed => handleCheckboxToggle(todo, completed)}
          onCheckColor={COLORS.primary}
          onTintColor={COLORS.primary}
          tintColors={{true: COLORS.primary, false: 'grey'}}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: todo?.completed ? 'normal' : '600',
              fontSize: 15,

              width: wp(60),
              color: todo?.completed ? 'grey' : COLORS.black,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 15,
              marginTop: hp(0.5),
              color: isPastDue
                ? 'red'
                : todo?.completed
                ? COLORS.completeTime
                : COLORS.normalTime,
            }}>
            {todo?.dueDate}
          </Text>
        </View>

        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="grey" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const filterTodos = () => {
    let filteredData = todos;

    if (searchTxt) {
      filteredData = filteredData.filter((todo: any) =>
        todo.task.toLowerCase().includes(searchTxt.toLowerCase()),
      );
    }
    switch (activeFilter) {
      case 'Completed':
        filteredData = filteredData.filter((todo: any) => todo.completed);
        break;
      case 'InCompleted':
        filteredData = filteredData.filter((todo: any) => !todo.completed);
        break;
      default:
        break;
    }

    return filteredData;
  };

  const filteredData = filterTodos();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                marginLeft: wp(3),
                color: COLORS.black,
              }}>
              To-dos
            </Text>
            <MaterialIcons
              name="delete-forever"
              size={25}
              color="grey"
              onPress={clearAllTodos}
            />
          </View>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date: any) => {
              handleDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TextInput
            value={searchTxt}
            placeholder="Search to-dos"
            style={{
              padding: hp(1.5),
              borderColor: isFocusedSearch ? COLORS.primary : COLORS.border,
              width: wp(85),
              borderRadius: hp(2),
              borderWidth: 1,
              paddingHorizontal: wp(4),
              alignSelf: 'center',
            }}
            onFocus={() => setIsFocusedSearch(true)}
            onBlur={() => setIsFocusedSearch(false)}
            onChangeText={text => handleSearchChange(text)}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: wp(4),
              marginTop: 20,
              width: wp(100),
              alignSelf: 'center',
            }}>
            {FilterButtons.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleFilterPress(item.title)}
                style={{
                  paddingHorizontal: wp(3),
                  paddingVertical: 10,
                  borderRadius: hp(2),
                  backgroundColor:
                    activeFilter === item.title
                      ? COLORS.primary
                      : COLORS.secondary,
                }}>
                <Text
                  style={{
                    color: activeFilter ? COLORS.white : COLORS.black,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {filteredData.length === 0 &&
            !Loading &&
            !searchTxt &&
            todos.length !== 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: hp(50),
                }}>
                <SvgXml xml={todoSvg} height={hp(5)} width={wp(10)} />

                <Text
                  style={{
                    color: 'grey',
                    fontSize: 15,
                    fontWeight: '500',
                    marginTop: hp(1),
                  }}>
                  {`No ${
                    activeFilter === 'Completed' ? 'Completed' : 'InCompleted'
                  } to-dos`}
                </Text>
              </View>
            )}
          {filteredData.length === 0 && !Loading && searchTxt !== '' && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: hp(50),
              }}>
              <SvgXml xml={todoSvg} height={hp(5)} width={wp(10)} />

              <Text
                style={{
                  color: 'grey',
                  fontSize: 15,
                  fontWeight: '500',
                  marginTop: hp(1),
                }}>{`No To-dos found`}</Text>
            </View>
          )}
          {Loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'small'} color={COLORS.primary} />
            </View>
          ) : (
            <>
              {todos.length === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(60),
                  }}>
                  <SvgXml xml={todoSvg} height={hp(5)} width={wp(10)} />

                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 15,
                      fontWeight: '500',
                      marginTop: hp(1),
                    }}>
                    No to-dos
                  </Text>
                </View>
              )}

              {todos.length > 0 && (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{padding: 20, paddingBottom: 100}}
                  data={filteredData}
                  renderItem={({item}) => <ListItem todo={item} />}
                />
              )}
            </>
          )}
        </View>
        <View style={styles.footer}>
          <View
            style={[
              styles.inputContainer,
              {
                borderWidth: 1,
                borderColor: isFocused ? COLORS.primary : COLORS.border,
                flexDirection: 'row',
                width: wp(100),
              },
            ]}>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                width: wp(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="date-range" size={20} color={'grey'} />
            </TouchableOpacity>

            <TextInput
              value={textInput}
              placeholder="Add To-dos"
              style={{
                padding: hp(1),
                right: wp(2.5),
                width: wp(60),
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={text => setTextInput(text)}
            />
          </View>
          <TouchableOpacity onPress={addTodo}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="add" color="white" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
