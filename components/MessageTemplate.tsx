import { icons } from '@/constants';
import useTemplate from '@/hooks/useTemplate';
import { BottomSheetBackdrop, BottomSheetFlashList, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';




const MessageTemplate = forwardRef<BottomSheetModal>((_, ref) => {

    const Points = useMemo(() => ["40%", "60%", "90%"], []);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplatesResponse['data'][0] | null>(null);

    const { getTemplate } = useTemplate()

    const renderBackdrop = React.useCallback((props: any) => (
        <BottomSheetBackdrop
            {...props}
            enableTouchThrough
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
        />
    ), []);



    const RenderTemplateList = () => (
        <>
            <View className='px-4 pb-2 pt-4' >
                <View className='flex flex-row items-start justify-between mb-4'>
                    <Text className='text-xl font-JakartaBold text-neutral-800'>Message Templates</Text>
                    <View className='py-1 px-3 bg-amber-100 rounded-full border border-amber-200'>
                        <Text className='text-amber-600 font-JakartaSemiBold text-sm'>
                            {getTemplate.data?.total}
                        </Text>
                    </View>
                </View>
            </View>

            <BottomSheetFlashList
                data={getTemplate.data?.data}
                keyExtractor={(item) => String(item?.id)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedTemplate(item)}
                        activeOpacity={0.7}
                        className='flex flex-row bg-white border border-gray-100 py-4 px-4 items-center my-2 rounded-3xl'
                        style={{
                            shadowColor: '#10b981',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            elevation: 3,
                        }}
                    >
                        {/* Icon Container with Gradient Effect */}
                        <View
                            className='size-14 flex items-center justify-center rounded-2xl mr-4'
                            style={{
                                backgroundColor: '#10b981',
                                shadowColor: '#10b981',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 6,
                                elevation: 4,
                            }}
                        >
                            <Image source={icons.template as any} className='w-6 h-6' tintColor={'#fff'} />
                        </View>

                        {/* Content */}
                        <View className='flex-1 mr-3'>
                            <Text
                                className='font-JakartaBold text-gray-900 text-base mb-1'
                                numberOfLines={1}
                            >
                                {item?.name}
                            </Text>
                            <View className='flex flex-row items-center gap-1'>
                                <View className='size-1 rounded-full bg-emerald-400' />
                                <Text className='text-xs text-gray-500 font-JakartaMedium'>
                                    Ready to use
                                </Text>
                            </View>
                        </View>

                        {/* Category Badge */}
                        <View
                            className='bg-emerald-50 py-2 px-3.5 rounded-2xl border border-emerald-100'
                            style={{
                                shadowColor: '#10b981',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.05,
                                shadowRadius: 3,
                                elevation: 1,
                            }}
                        >
                            <Text className='text-xs text-emerald-600 font-JakartaBold'>
                                {item?.category}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<>
                    {getTemplate.isLoading ?
                        <View>
                            <ActivityIndicator style={{ marginVertical: 50 }} color={"#34d399"} size={22} />
                        </View>
                        : getTemplate.isError
                            ? <View>
                                <Text className='text-center text-red-500 font-JakartaMedium'>
                                    Failed to load templates
                                </Text>
                            </View>
                            : <View>
                                <Text className='text-center text-gray-500 font-JakartaMedium'>
                                    No templates found
                                </Text>
                            </View>
                    }
                </>}
                estimatedItemSize={94}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 10 }}
            />
        </>
    )


    const RenderPreview = () => {

        // Generate input fields based on number of variables
        const renderVariableInputs = () => {
            const numVariables = +selectedTemplate?.variable!;
            if (numVariables === 0) return null;

            return (
                <View className='mx-4 mb-4'>
                    <Text className='text-sm font-JakartaBold text-neutral-700 mb-3'>
                        Fill Template Variables
                    </Text>
                    {Array.from({ length: numVariables }, (_, index) => (
                        <View key={index} className='mb-3'>
                            <Text className='text-xs font-JakartaMedium text-neutral-600 mb-1'>
                                Variable {index + 1} (Replace {'{'}{'{'}{index + 1}{'}'}{'}'}):
                            </Text>
                            <TextInput
                                className='bg-white border border-neutral-300 rounded-lg px-4 py-3 font-JakartaRegular text-sm text-neutral-800'
                                placeholder={`Enter value for {{${index + 1}}}`}
                                placeholderTextColor="#9CA3AF"
                            // value={variableValues[index + 1] || ''}

                            />
                        </View>
                    ))}
                </View>
            );
        };

        // Replace variables in body with user input
        const getDisplayBody = () => {
            let body = selectedTemplate?.body || '';
            // const numVariables = parseInt(selectedTemplate?.variable || 0);

            // for (let i = 1; i <= numVariables; i++) {
            //     const regex = new RegExp(`\\{\\{${i}\\}\\}`, 'g');
            //     body = body.replace(regex, variableValues[i] || `{{${i}}}`);
            // }

            return body;
        };

        const renderHeader = () => {
            if (!selectedTemplate?.header) return null;

            return (
                <View className='bg-neutral-50 p-4 border-b border-neutral-200'>
                    {selectedTemplate.header.type === 'Text' ? (
                        <Text className='text-sm font-JakartaMedium text-neutral-600'>
                            {selectedTemplate?.header?.content}
                        </Text>
                    ) : selectedTemplate.header.type === 'Image'
                        ? (
                            <View className='h-[200px]'>
                                <Image source={{ uri: selectedTemplate.header.content }} resizeMode='cover' className='h-full rounded-2xl' />
                            </View>
                        ) : (
                            <Text className='text-sm font-JakartaMedium text-neutral-600'>
                                {selectedTemplate?.header?.content}
                            </Text>
                        )}
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginBottom: 100, paddingHorizontal: 10 }}>
                <View className='px-4 pb-2 pt-4'>
                    <View className='flex flex-row items-center justify-between mb-4'>
                        <Text className='text-xl font-JakartaBold text-neutral-800'>Preview</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedTemplate(null)}>
                            <Text className='text-emerald-600 font-JakartaSemiBold text-sm'>
                                Choose Another
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <BottomSheetScrollView showsVerticalScrollIndicator={false}>

                    {/* WhatsApp Message Card */}
                    <View className='mx-4 mb-6'>
                        <View className='bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden'>
                            {/* Header Section */}
                            {renderHeader()}

                            {/* Body Section */}
                            <View className='p-4 bg-emerald-50'>
                                <Text className='text-base font-JakartaMedium text-neutral-800 leading-6'>
                                    {getDisplayBody()}
                                </Text>
                            </View>

                            {/* Footer Section */}
                            {selectedTemplate?.footer && (
                                <View className='px-4 pb-3 pt-2 bg-emerald-50'>
                                    <Text className='text-xs font-JakartaRegular text-neutral-500'>
                                        {selectedTemplate.footer}
                                    </Text>
                                </View>
                            )}

                            {/* Buttons Section */}
                            {selectedTemplate?.button && selectedTemplate.button.length > 0 && (
                                <View className='p-3 bg-white border-t border-neutral-200'>
                                    {selectedTemplate.button.map((btn, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.7}
                                            className='py-3 px-4 bg-white border border-emerald-500 rounded-lg mb-2'
                                            style={{ marginBottom: index === selectedTemplate.button.length - 1 ? 0 : 8 }}
                                        >
                                            <Text className='text-center text-emerald-600 font-JakartaSemiBold text-sm'>
                                                {btn}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Variable Input Fields */}
                        {renderVariableInputs()}

                        {/* Help Text */}
                        {Number(selectedTemplate?.variable) > 0 && (
                            <View className='mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200'>
                                <Text className='text-xs font-JakartaMedium text-blue-800'>
                                    💡 Fill in the variables above to see how your message will look
                                </Text>
                            </View>
                        )}
                    </View>
                </BottomSheetScrollView>
            </View>
        );
    };



    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={Points}
            index={0}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
        >
            {selectedTemplate ? RenderPreview() : RenderTemplateList()}
        </BottomSheetModal>
    )
})


MessageTemplate.displayName = 'MessageTemplate';

export default MessageTemplate;



