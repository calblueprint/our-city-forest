import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

type ButtonType = 'Total' | 'Healthy' | 'Diseased' | 'Dead';

interface MonthlyData {
  month: number;
  totalCount: number;
  date: string;
  initial: string;
  fullMonth: string;
  healthyCount?: number;
  diseasedCount?: number;
  deadCount?: number;
}

type BarChartProps = {
  selectedButton?: ButtonType;
  data: MonthlyData[];
  selectedBarIndex: number | null;
  onBarSelect: (index: number | null) => void;
};

export const BarChart: React.FC<BarChartProps> = ({
  selectedButton = 'Total',
  data = [],
  selectedBarIndex,
  onBarSelect,
}) => {
  const chartWidth = Dimensions.get('window').width - 48;
  const chartHeight = (chartWidth * 1) / 1.618; // 1:1.618 aspect ratio
  const barWidth = chartWidth / 12 - 4;
  const paddingBottom = 24;

  const handleBarClick = (index: number) => {
    if (selectedBarIndex === index) {
      onBarSelect(null);
    } else {
      onBarSelect(index);
    }
  };

  const getBarColor = (index: number) => {
    if (selectedBarIndex === null) {
      return colors.primary;
    }
    return index === selectedBarIndex ? colors.primary : colors.gray5;
  };

  const getBarValue = (item: MonthlyData): number => {
    if (selectedButton === 'Total') {
      return item.totalCount;
    } else if (
      selectedButton === 'Healthy' &&
      item.healthyCount !== undefined
    ) {
      return item.healthyCount;
    } else if (
      selectedButton === 'Diseased' &&
      item.diseasedCount !== undefined
    ) {
      return item.diseasedCount;
    } else if (selectedButton === 'Dead' && item.deadCount !== undefined) {
      return item.deadCount;
    }
    return 0;
  };

  const renderBarChart = () => {
    if (data.length === 0) return null;

    // Convert data to display values based on selected button
    const displayData = data.map(item => ({
      ...item,
      displayValue: getBarValue(item),
    }));

    // Find the maximum value to scale the bars correctly
    const maxValue = Math.max(1, ...displayData.map(d => d.displayValue));

    // Calculate the scale factor for bars
    const scale = (chartHeight - paddingBottom) / maxValue;

    // Calculate bar positions and dimensions
    const barSpacing = chartWidth / data.length;

    return (
      <Svg
        width={chartWidth}
        height={chartHeight}
        style={{ alignSelf: 'center' }}
      >
        {/* Render data bars */}
        <G>
          {displayData.map((item, index) => {
            const barHeight = Math.max(1, item.displayValue * scale);
            const barX = index * barSpacing + (barSpacing - barWidth) / 2;
            const barY = chartHeight - paddingBottom - barHeight;

            // Create a touchable area for the bar
            const touchAreaWidth = barSpacing;
            const touchAreaX = index * barSpacing;
            const touchAreaHeight = chartHeight - paddingBottom;
            const touchAreaY = 0;

            return (
              <G key={index}>
                {/* Main value bar */}
                <Rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={getBarColor(index)}
                  rx={4}
                  ry={4}
                />

                {/* X-axis label (initial letter of month) */}
                <SvgText
                  x={barX + barWidth / 2}
                  y={chartHeight - paddingBottom + 16}
                  fill={colors.gray3}
                  textAnchor="middle"
                  fontSize={12}
                  fontFamily={
                    index === selectedBarIndex
                      ? typography.smallBold.fontFamily
                      : typography.smallRegular.fontFamily
                  }
                  letterSpacing={typography.smallRegular.letterSpacing}
                >
                  {item.initial}
                </SvgText>

                {/* Invisible touch area (larger than the bar for easier tapping) */}
                <Rect
                  x={touchAreaX}
                  y={touchAreaY}
                  width={touchAreaWidth}
                  height={touchAreaHeight}
                  fill="transparent"
                  onPress={() => handleBarClick(index)}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  return <View>{renderBarChart()}</View>;
};
