import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const MessageTemplate = ({ visible, onClose }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const Points = useMemo(() => ["40%", "60%", "95%"], []);

    useEffect(() => {
        if (visible) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.close();
        }
    }, [visible]);

    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
        />
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={Points}
            index={-1}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            onClose={onClose}
            backdropComponent={renderBackdrop}

        >
            <BottomSheetView style={styles.contentContainer}>
                <Text style={styles.title}>Message Templates</Text>
                {/* Add your template content here */}
            </BottomSheetView>
        </BottomSheet>
    );
};

export default MessageTemplate;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
