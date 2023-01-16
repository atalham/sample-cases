// import { useAskCode } from '@api/hooks/creative.hook';
import { Metrics, translate } from '@utils';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import Shimmer from 'react-native-shimmer';
import {
  Box,
  Text,
  Stack,
  Image,
  Container,
  HStack,
  Center,
  Icon,
  Button,
  IconButton,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useForm from './useForm';

const Welcome: FC = () => {
  const [page, setPage] = useState(0);
  const [fingerUp, setFingerUp] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isvalid, setIsvalid] = useState(false);

  const dotSize1 = useRef(new Animated.Value(1)).current;
  const dotSize2 = useRef(new Animated.Value(0.75)).current;
  const dotSize3 = useRef(new Animated.Value(0.75)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  const moveX = useRef(new Animated.Value(0)).current;
  const containScreen = useRef(new Animated.Value(0)).current;
  const animateColor = useRef(new Animated.Value(0)).current;
  const color = animateColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#66b584', '#f2845b', '#66b584'],
  });
  const heightRange = containScreen.interpolate({
    inputRange: [0, 10],
    outputRange: [0, Metrics.HEIGHT],
  });
  const widthRange = containScreen.interpolate({
    inputRange: [0, 10],
    outputRange: [0, Metrics.WIDTH],
  });
  const leftRange = containScreen.interpolate({
    inputRange: [0, 10],
    outputRange: [Metrics.WIDTH / 2, 0],
  });
  const rightRange = containScreen.interpolate({
    inputRange: [0, 10],
    outputRange: [771, 0],
  });
  const borderRange = containScreen.interpolate({
    inputRange: [0, 9, 10],
    outputRange: [2000, 2000, 0],
  });
  const opacityRange = containScreen.interpolate({
    inputRange: [0, 9, 10],
    outputRange: [0, 0, 1],
  });
  const AnimatedCenter = Animated.createAnimatedComponent(Center);
  const AnimatedHStack = Animated.createAnimatedComponent(HStack);
  const AnimatedStack = Animated.createAnimatedComponent(Stack);
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const AnimatedBox = Animated.createAnimatedComponent(Box);
  const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);

  const [formValue, Form] = useForm('');

  const TextForm = useCallback(() => {
    if (showModal) {
      return (
        <>
          <AnimatedBox
            zIndex={99}
            style={{
              width: widthRange,
              height: heightRange,
              borderRadius: borderRange,
              transform: [{ translateX: leftRange }, { translateY: rightRange }],
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            bg="primary.200"
            alignItems="center"
            justifyContent="center"
          >
            <AnimatedIconButton
              style={{ opacity: opacityRange }}
              variant="ghost"
              _icon={{
                as: FontAwesome5,
                name: 'times-circle',
                size: '10',
                color: 'primary.700',
              }}
              _pressed={{
                bg: 'transparent',
                _icon: { opacity: 0.75 },
              }}
              zIndex={99}
              position="absolute"
              top="16"
              right="8"
              onPress={() => {
                Animated.parallel([
                  Animated.timing(containScreen, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                  }),
                ]).start();
                setShowForm(false);
                setTimeout(() => setShowModal(false), 500);
              }}
            />
            <AnimatedCenter style={{ opacity: opacityRange }} justifyContent="center">
              <Text fontSize="32" fontWeight="600" color="primary.700" mb="12">
                Email Address
              </Text>
              {Form}
            </AnimatedCenter>
          </AnimatedBox>
        </>
      );
    } else return <></>;
  }, [showModal, showForm]);
  // const { mutateAsync: askCode, isLoading, data, isSuccess } = useAskCode();

  // const login = async () => {
  //   try {
  //     await askCode({ email: 'atalham@gmail.com', date: 100, name: 'Ahmet' });
  //     if (isSuccess) {
  //     }
  //   } catch (error) {
  //     console.log(error, 'ERROR');
  //   }
  // };

  useEffect(() => {
    if (page === 0) {
      Animated.parallel([
        Animated.timing(opacity1, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(opacity2, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(opacity3, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
      ]).start();
    }
    if (page === 1) {
      Animated.parallel([
        Animated.timing(opacity1, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(opacity3, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
      ]).start();
    }
    if (page === 2) {
      Animated.parallel([
        Animated.timing(opacity1, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(opacity2, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(opacity3, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [page]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => fingerUp,
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dx > 10 && page !== 0) {
            if (page === 1) {
              Animated.parallel([
                Animated.timing(animateColor, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize1, {
                  toValue: 1,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(moveX, {
                  toValue: 0,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize2, {
                  toValue: 0.75,
                  duration: 700,
                  useNativeDriver: false,
                }),
              ]).start();
              setPage(0);
            } else {
              Animated.parallel([
                Animated.timing(animateColor, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: false,
                }),
                Animated.timing(moveX, {
                  toValue: -20,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize3, {
                  toValue: 0.75,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize2, {
                  toValue: 1,
                  duration: 700,
                  useNativeDriver: false,
                }),
              ]).start();
              setPage(1);
            }
          } else if (gestureState.dx < -10 && page !== 2) {
            if (page === 1) {
              Animated.parallel([
                Animated.timing(moveX, {
                  toValue: -40,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize2, {
                  toValue: 0.75,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize3, {
                  toValue: 1,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(animateColor, {
                  toValue: 2,
                  duration: 500,
                  useNativeDriver: false,
                }),
              ]).start();
              setPage(2);
            } else {
              Animated.parallel([
                Animated.timing(animateColor, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize1, {
                  toValue: 0.75,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(dotSize2, {
                  toValue: 1,
                  duration: 700,
                  useNativeDriver: false,
                }),
                Animated.timing(moveX, {
                  toValue: -20,
                  duration: 700,
                  useNativeDriver: false,
                }),
              ]).start();
              setPage(1);
            }
          }
        },
        onPanResponderEnd() {
          setFingerUp(true);
        },
        onPanResponderGrant() {
          setFingerUp(false);
        },
      }),
    [fingerUp]
  );

  const ModalPage = () => {
    if (showModal) {
      return (
        <>
          <AnimatedBox
            zIndex={99}
            style={{
              width: widthRange,
              height: heightRange,
              borderRadius: borderRange,
              transform: [{ translateX: leftRange }, { translateY: rightRange }],
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            bg="primary.200"
            alignItems="center"
            justifyContent="center"
          >
            <AnimatedIconButton
              style={{ opacity: opacityRange }}
              variant="ghost"
              _icon={{
                as: FontAwesome5,
                name: 'times-circle',
                size: '10',
                color: 'primary.700',
              }}
              _pressed={{
                bg: 'transparent',
                _icon: { opacity: 0.75 },
              }}
              zIndex={99}
              position="absolute"
              top="16"
              right="8"
              onPress={() => {
                Animated.parallel([
                  Animated.timing(containScreen, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                  }),
                ]).start();
                setShowForm(false);
                setTimeout(() => setShowModal(false), 500);
              }}
            />
            <AnimatedCenter style={{ opacity: opacityRange }} justifyContent="center">
              <Text fontSize="32" fontWeight="600" color="primary.700" mb="12">
                Email Address
              </Text>
            </AnimatedCenter>
          </AnimatedBox>
          {Form}
        </>
      );
    } else return <></>;
  };

  return (
    <Container
      height="full"
      minWidth="full"
      centerContent
      justifyContent="center"
      {...panResponder.panHandlers}
    >
      <TextForm />
      <AnimatedStack
        style={{ backgroundColor: color }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="full"
        minWidth="full"
      >
        {page === 0 ? (
          <Animated.View style={{ opacity: opacity1, alignItems: 'center' }}>
            {/* <Image
              defaultSource={require('@images/logo.png')}
              mt="40"
              resizeMode="cover"
              source={require('@images/logo.png')}
              alt="logo"
              width="2xs"
              height="2xs"
            /> */}
            <Text
              color="orange.300"
              fontFamily="apache"
              fontWeight="100"
              fontSize="7xl"
              mb="16"
              mt="40"
              textAlign="center"
            >
              Mandalin
            </Text>
            <Text bold fontSize="lg" mb="16" textAlign="center" width="xs">
              {translate('intro')}
            </Text>
            <Box height="10" mt="64">
              <Shimmer pauseDuration={600} duration={1400} direction="left">
                <Text bold fontSize="2xl">
                  Slide to continue {'<'}
                </Text>
              </Shimmer>
            </Box>
          </Animated.View>
        ) : page === 1 ? (
          <Animated.View style={{ opacity: opacity2, alignItems: 'center' }}>
            <Image
              defaultSource={require('@images/second.png')}
              mt="40"
              resizeMode="cover"
              source={require('@images/second.png')}
              alt="logo2"
              width="2xs"
              height="2xs"
            />
            <Text
              fontFamily="apache"
              fontWeight="100"
              fontSize="lg"
              mb="16"
              textAlign="center"
              width="xs"
            >
              {translate('intro2')}
            </Text>
            <Box height="10" mt="40" />
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: opacity3, alignItems: 'center' }}>
            <Image
              defaultSource={require('@images/logo.png')}
              mt="40"
              resizeMode="cover"
              source={require('@images/logo.png')}
              alt="logo3"
            />
            <Text bold fontSize="lg" mb="16" textAlign="center" width="xs">
              {translate('intro')}
            </Text>
            <Box height="10" mt="40">
              <Button
                _light={{
                  _pressed: { bg: 'primary.200' },
                  bg: 'gray.300:alpha.90',
                  _text: { color: 'black', fontFamily: 'body', fontWeight: 600 },
                }}
                onPress={() => {
                  Animated.parallel([
                    Animated.timing(containScreen, {
                      toValue: 10,
                      duration: 500,
                      useNativeDriver: false,
                    }),
                  ]).start();
                  setTimeout(() => setShowForm(true), 500);
                  setShowModal(true);
                }}
              >
                {translate('introbutton')}
              </Button>
            </Box>
          </Animated.View>
        )}
        <AnimatedHStack
          style={{ transform: [{ translateX: moveX }] }}
          mt="10"
          ml="10"
          width="32"
          justifyContent={'space-between'}
          alignItems="center"
        >
          <AnimatedCenter
            opacity={0.9}
            bgColor="gray.300"
            rounded="32"
            width="9"
            height="9"
            style={{ transform: [{ scaleX: dotSize1 }, { scaleY: dotSize1 }] }}
            alignItems="center"
          >
            {page === 0 && (
              <AnimatedIcon
                as={FontAwesome}
                size="6"
                name="home"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                style={{ color: color }}
                _dark={{
                  color: 'warmGray.50',
                }}
              />
            )}
          </AnimatedCenter>
          <AnimatedCenter
            opacity={0.9}
            style={{ transform: [{ scaleX: dotSize2 }, { scaleY: dotSize2 }] }}
            bgColor="gray.300"
            rounded="32"
            width="9"
            height="9"
          >
            {page === 1 ? (
              <AnimatedIcon
                as={MaterialCommunityIcons}
                size="6"
                name="magnify"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                style={{ color: color }}
                _dark={{
                  color: 'warmGray.50',
                }}
              />
            ) : (
              page === 0 && (
                <AnimatedIcon
                  as={MaterialIcons}
                  size="6"
                  name="stop-circle"
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  style={{ color: color }}
                />
              )
            )}
          </AnimatedCenter>
          <AnimatedCenter
            opacity={0.9}
            style={{ transform: [{ scaleX: dotSize3 }, { scaleY: dotSize3 }] }}
            bgColor="gray.300"
            rounded="32"
            width="9"
            height="9"
          >
            {page === 2 ? (
              <AnimatedIcon
                as={FontAwesome}
                size="6"
                name="thumbs-up"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                style={{ color: color }}
                _dark={{
                  color: 'warmGray.50',
                }}
              />
            ) : (
              <AnimatedIcon
                as={MaterialIcons}
                size="6"
                name="stop-circle"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                style={{ color: color }}
              />
            )}
          </AnimatedCenter>
        </AnimatedHStack>
      </AnimatedStack>
    </Container>
  );
};

export default Welcome;
