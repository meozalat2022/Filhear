import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../Constants/Colors';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import BannerAdUnite from '../../component/BannerAdUnite';
import InterstisialAdUnite from '../../component/InterstisialAdUnite';

const AddService = ({navigation}) => {
  const [checked, setChecked] = React.useState('OFFERED');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});
  const imageInitialState =
    'https://firebasestorage.googleapis.com/v0/b/filkhear.appspot.com/o/Service%2FFilkhaer.jpg?alt=media&token=a7ac0cdd-2240-4e38-b473-4513e3900667';
  const addressNotesInitialState = 'لا يوجد';
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceImage, setServiceImage] = useState(imageInitialState);
  const [notes, setNotes] = useState(addressNotesInitialState);
  const [address, setAddress] = useState(addressNotesInitialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [areaValue, setAreaValue] = useState(null);
  const [area, setArea] = useState([
    {label: 'المعادي', value: 'PmwAmkbp7foSj2VL5I5b'},
    {label: 'القاهرة الجديدة', value: 'mNjdi5JaTfKl2AL9N2w2'},
    {label: 'الزمالك', value: '7a1LImt2uVfzJfKeOEBw'},
    {label: 'الدقي', value: 'cSHsSdC0P0A96GIesney'},
    {label: 'مدينة نصر', value: '7ZADD4OeznnoVDEYNgmQ'},
    {label: 'العجوزة', value: 'Emn5Jqxxxgc4mMzKXa4Z'},
    {label: 'اكتوبر', value: 'wQ0yiHLCch0w8ydbXTCd'},
    {label: 'مصر الجديدة', value: '6EdmbPYByVVQNlHE0byk'},
    {label: 'المقطم', value: '0cqcF0Uwo1T35iYIcbfq'},
    {label: 'العباسية', value: 'pByT0sBf9uTjma7IH0Z4'},
    {label: 'الشروق', value: 'UqZRaEPNUeJMeILsBMXX'},
    {label: 'شبرا', value: 'CIFe2Rs5lFQs71hoooNV'},
    {label: 'المهندسين', value: 'rGOxxDrDwK063iuyTXt7'},
    {label: 'عين شمس', value: 'gkeX4uPdfk8UXnwi1Thc'},
    {label: 'العبور', value: '9dUsLlQcCAv1fvRV5fED'},
    {label: 'حلوان', value: 'a00EswOkIAFj58QFh5TD'},
    {label: 'ألجيزة والهرم', value: 'WrkqPRGaU31eJgDqYVVH'},
    {label: 'وسط البلد', value: 'A7HoyTC11rSrcMe1tKL7'},
    {label: 'مناطق أخرى', value: 'cWi3vRUPC2mS3USgd7My'},
  ]);

  const [serviceValue, setServiceValue] = useState(null);
  const [service, setService] = useState([
    {label: 'توصيلة', value: 'wh9832lG7ynxQKI8Lzp7'},
    {label: 'حيوانات', value: 'z6cbZWwcWEn4TCdq00OG'},
    {label: 'درس خصوصي', value: 'tZEB9L7m2HgItih3ifkY'},
    {label: 'هوايات', value: 'rGmvwn3ekfvWLFbTPOWD'},
    {label: 'هات وخد', value: 'Y4I0IlhzAMpX5SrUrafm'},
    {label: 'عفش', value: 'jh1KqAxfPBiVuCptXfRZ'},
    {label: 'ادوية', value: 'uBvVLZV2Zn7VWGzYCHh9'},
    {label: 'ملابس', value: 'Xu1taGeMxsOjGh0vKiME'},
    {label: 'صيانة', value: '9IwsCnMmlgFU00WnqOXK'},
    {label: 'ادوات منزلية', value: '3k3NbptRwbo4zXT9aYir'},
    {label: 'متنوع', value: 'mt8kExbQAzJQxWmThK55'},
  ]);

  //drop down picker

  const [isFocus, setIsFocus] = useState(false);

  // image picker
  const pickImages = () => {
    setModalVisible(!modalVisible);
    ImagePicker.openPicker({
      // multiple: true,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImages(image.path);
    });
  };
  const pickFromCamera = () => {
    setModalVisible(!modalVisible);
    ImagePicker.openCamera({
      // multiple: true,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImages(image.path);
    });
  };
  const uploadImagesToStorage = async () => {
    if (!images) {
      return;
    } else {
      const uploadUri = images;
      let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      setTransferred(0);
      const storageRef = storage().ref('Service/' + fileName);
      const task = storageRef.putFile(uploadUri);
      // Set transferred state
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );

        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });
      try {
        await task;
        const url = await storageRef.getDownloadURL();
        setImages(null);
        console.log('url', url);
        return url;
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const onSubmit = async data => {
    const userAddress = data.serviceProviderAddress;
    const userNotes = data.serviceProviderNotes;

    setUploading(true);
    const imageUrl = await uploadImagesToStorage();
    // if (imageUrl) {
    //   setServiceImage(imageUrl);
    //   console.log('000000000', serviceImage);
    // }
    firestore()
      .collection('Service')
      .add({
        type: checked,
        name: data.serviceName,
        description: data.serviceDescription,
        image: imageUrl ? imageUrl : serviceImage,
        serviceProviderName: data.serviceProviderName,
        serviceProviderAddress: userAddress ? userAddress : address,
        serviceProviderPhone: data.serviceProviderPhone,
        notes: userNotes ? userNotes : notes,
        categoryID: serviceValue,
        areaID: areaValue,
        timestamp: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        setUploading(false);
        navigation.navigate('Areas');
      });
  };
  if (uploading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={{marginHorizontal: 10}}>
      {/* <InterstisialAdUnite /> */}
      <View style={{alignItems: 'center'}}>
        <BannerAdUnite />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>مطلوب</Text>
            <RadioButton
              color={Colors.primary}
              value="WANTED"
              status={checked === 'WANTED' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('WANTED')}
            />
          </View>
          <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>معروض</Text>
            <RadioButton
              color={Colors.primary}
              value="OFFERED"
              status={checked === 'OFFERED' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('OFFERED')}
            />
          </View>
        </View>
        {/* <BannerAdUnite /> */}
        <Text style={styles.label}>الخدمة</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 50,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="الخدمة"
              keyboardType="default"
              name="service"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textAlign="right"
              returnKeyType="next"
            />
          )}
          name="serviceName"
        />
        {errors.serviceName && (
          <Text style={{color: 'red'}}>
            رجاء ادخال عنوان للخدمة المقدمة / المطلوبة بحد اقصى 50 حرف
          </Text>
        )}
        <Text style={styles.label}>وصف الخدمة</Text>
        <Controller
          control={control}
          rules={{required: true, maxLength: 500}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.input, {height: 150, textAlignVertical: 'top'}]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              numberOfLines={6}
              textAlign="right"
              returnKeyType="next"
              placeholder="وصف وتفاصيل الخدمة المقدمة / المطلوبة"
            />
          )}
          name="serviceDescription"
        />
        {errors.serviceDescription && (
          <Text style={{color: 'red'}}>
            رجاء ادخال وصف للخدمة المقدمة / المطلوبة بحد اقصى 500 حرف
          </Text>
        )}
        <Text style={styles.label}>الصور</Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Pressable
            style={{
              backgroundColor: Colors.primary,
              width: '60%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderRadius: 20,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
              اختر صورة
            </Text>
          </Pressable>
        </View>
        <Text style={[styles.label, {marginVertical: 10}]}>المنطقة</Text>
        <View style={styles.container}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={area}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'اختر المنطقة' : '...'}
            searchPlaceholder="Search..."
            value={areaValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setAreaValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        {!areaValue && (
          <Text style={{color: 'red'}}>لا بد من اختيار منطقة</Text>
        )}
        <Text style={[styles.label, {marginVertical: 10}]}>النوع</Text>
        <View style={styles.container}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={service}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'اختر الخدمة' : '...'}
            searchPlaceholder="Search..."
            value={serviceValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setServiceValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        {!serviceValue && (
          <Text style={{color: 'red'}}>لا بد من اختيار نوع الخدمة</Text>
        )}
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: 20,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            color: Colors.primary,
          }}>
          بيانات الاتصال
        </Text>
        <Text style={styles.label}>الاسم</Text>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textAlign="right"
              returnKeyType="next"
            />
          )}
          name="serviceProviderName"
        />
        {errors.serviceProviderName && (
          <Text style={{color: 'red'}}>رجاء كتابة اسم مقدم الخدمة</Text>
        )}
        <Text style={styles.label}>التليفون</Text>
        <Controller
          control={control}
          rules={{
            maxLength: 14,
            minLength: 11,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textAlign="right"
              returnKeyType="next"
              keyboardType="number-pad"
              placeholder="01111111111"
            />
          )}
          name="serviceProviderPhone"
        />
        {errors.serviceProviderPhone && (
          <Text style={{color: 'red'}}>
            رجاء ادخال تليفون للتواصل مع مقدمة / طالب الخدمة
          </Text>
        )}
        <Text style={styles.label}>العنوان</Text>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textAlign="right"
              returnKeyType="next"
              placeholder="اختياري"
            />
          )}
          name="serviceProviderAddress"
        />
        <Text style={styles.label}>ملاحظات</Text>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textAlign="right"
              returnKeyType="next"
              placeholder="اختياري"
            />
          )}
          name="serviceProviderNotes"
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: Colors.accent,
            marginHorizontal: 25,
            borderRadius: 25,
            marginBottom: 70,
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            يــــــلا
          </Text>
        </Pressable>
        <BannerAdUnite />
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={pickImages} style={styles.modalButton}>
            <Text style={styles.modalText}>صورة من الموبايل</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickFromCamera} style={styles.modalButton}>
            <Text style={styles.modalText}>صورة من الكاميرة</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={[styles.modalButton, {backgroundColor: 'red'}]}>
            <Text style={styles.modalText}>الغاء</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 7,
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  lottie: {
    width: '75%',
    height: '75%',
    alignItems: 'center',
  },
  ok: {
    justifyContent: 'center',
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
    position: 'absolute',
    bottom: 10,
    // margin: 20,
    height: '35%',
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButton: {
    margin: 15,
    bottom: 10,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  container: {
    backgroundColor: 'white',
    // padding: 10,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddService;

// response {
//   "body": {
//     "postResponse": {
//       "bucket": "filkhaer836de3aed86a4adeb788ef131a4be265225238-dev",
//       "etag": "a11215e0669b2751974addc5101ab8fc",
//       "key": "uploads/eb57bf60-ab32-4fa8-acaa-f1b985baf843.jpg",
//       "location": "https://filkhaer836de3aed86a4adeb788ef131a4be265225238-dev.s3.amazonaws.com/uploads%2Feb57bf60-ab32-4fa8-acaa-f1b985baf843.jpg"}},
//     "headers": {"content-length": "388", "content-type": "application/xml", "date": "Wed, 28 Dec 2022 19:58:29 GMT", "etag": "\"a11215e0669b2751974addc5101ab8fc\"", "location": "https://filkhaer836de3aed86a4adeb788ef131a4be265225238-dev.s3.amazonaws.com/uploads%2Feb57bf60-ab32-4fa8-acaa-f1b985baf843.jpg", "server": "AmazonS3", "x-amz-id-2": "RlE47ODyJNZdJcNbJZL+vRyfG46S4Uk/XmBe7M4oGnxlf18jdf6JPQM7PuKuDdKVzJyn9yMuroM=", "x-amz-request-id": "7KWQADT19JG32GY4", "x-amz-server-side-encryption": "AES256"}, "status": 201, "text": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
// <PostResponse><Location>https://filkhaer836de3aed86a4adeb788ef131a4be265225238-dev.s3.amazonaws.com/uploads%2Feb57bf60-ab32-4fa8-acaa-f1b985baf843.jpg</Location><Bucket>filkhaer836de3aed86a4adeb788ef131a4be265225238-dev</Bucket><Key>uploads/eb57bf60-ab32-4fa8-acaa-f1b985baf843.jpg</Key><ETag>\"a11215e0669b2751974addc5101ab8fc\"</ETag></PostResponse>"}
