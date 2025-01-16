import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [value, setValue] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const isReady = await AsyncStorage.getItem('@isReady');
        if(isReady === null){
          await AsyncStorage.setItem('@isReady', 'true');
        }
        setReady(true);
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
        setReady(false);
      }
    };

    checkAsyncStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if(ready){
        try {
          const storedValue = await AsyncStorage.getItem('@myKey');
          setValue(storedValue);
        } catch (error) {
          console.error('Error reading from AsyncStorage:', error);
          setValue(null);
        }
      }
    };
    fetchData();
  }, [ready]);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@myKey', 'someValue');
      console.log('Data saved successfully!');
      fetchData();
    } catch (e) {
      console.error('Failed to save the data to the storage', e);
    }
  };

  return (
    <div>
      <p>Value from AsyncStorage: {value}</p>
      <button onClick={storeData}>Store Data</button>
    </div>
  );
};

export default App;