// I could not figure this one out and took the solution from
// https://topaz.github.io/paste/#XQAAAQB4AwAAAAAAAAAxm8oZxjYXiKDwSs2wYUEvqbuYDo5CGb85Z+eS2Ydr+eOlOMBELg+tMiJOVTmiJ669Qj+CgnGA9QKVTCrzItJ4C6OWNSHmZyki2N7hgZp1HPYNYDduTqUuHNeDxrKtc1uFaujxDsJzkaB7zMb9GbmF1KRqFGAHsz+fKM3UsLQrSocTQxCG7Wnrkeb0UJ5iioRbo66ldjIRtDU5D1Z4AGjA/KsEft/K8oTjpHQcFPU/A6cXLs3+zmWPwjskoa2+HY66JbIVS3lPke6harH5rcN6FnJfdTGUTT07KSq4G+gS0zi8BQbFHd09jXg+vY3ft6HKSekNFochp3NSiux8KlNrdStga9C8w+KTkYG8/6F/LnO/IDs7fIEXNt1/prbF0+n7dQu5PTyT7ymPpfpMBpvyAFCGN/mjUHbFdGcCqkKSWuQIyO7+AaSGIzy3lW7sPndSsBB/83GUCACDgtT4gG83VKH3DmvTGFSvRiQ3QNVsF1EMqvk8ob2dZkDC6n+qsqaJwr1T19iB2hW4FAkm+r0RlcgbxoCP0sKAcHaMmrWim4/88q2CYCTyqMu1XRXYBsvL/1Xi0gA=
// https://topaz.github.io/paste/#XQAAAQDRAwAAAAAAAAAxm8oZxjYXiKDwSs2wYUEvqbuYDo5CGb85Z+eS2Ydr+eOlOMBELg+tMiJOVTmiJ669Qj+CgnGA9QKdfv9/ysx8+UwdDXZEi5u/8GeLDcYv6+KDIRBmZrZSCYvvB3OB/xjHHVVKgPYLu+LmSJIRjFXz0+KbmVVs6tJ+qhcemSipunvzDlrAeZ4HBP2Vt9GJge8qC1Pe7snWuXBl9nF8Z2kmvfE8FaY+/SV+Sm3lbavmZ9TysNCMrKHEGVFpaRMGlc2NF630t7qCFdL7NV5VstENxaIheCJ2vfKQ0LNM3jFE1H9pi8Pjd8IRS5PkSFp2dBRo3KmVZZR3X3GkE6/lCo3dbwLW/9Q0ZPNXOVMDCfQ3ER7A1UQTj7QtOsI33jVm8lryC8PVk7B8pcNRqhK5u31aPBUdkoBhUuhM549tWmZfBGwbJam3Td/kYnrCIVsF2H8KzQyXiDo5BdPAT9lCacnGIv2X/UgyDq++U62uRpzFRUMkDUdenpVe8fyIXiykgCp9IximFHL9zblt8A+4PSafm1MBE3l2WTU5d9uc/xMTIfx2XC5vSLYtM7WKZZygQB/+Hz2V3DTl6D0H/4etGQA=

import { readFileSync } from 'fs';

const readData = () =>
  readFileSync('./data/2021/day24.txt', 'utf8')
    .split('\n')
    .filter((line) => !!line);

const getBounds = (input: string[]) => {
  const getBound = (biggest: boolean) => {
    const final = Array(14);
    const stack = [];

    for (let i = 0; i < 14; i += 1) {
      const x_add = parseInt(input[18 * i + 5].split(' ')[2]);
      let y_add = parseInt(input[18 * i + 15].split(' ')[2]);
      if (x_add > 0) {
        stack.push([y_add, i]);
      } else {
        const s = stack.pop() as number[];
        y_add = s[0];
        const y_index = s[1];
        let to_add = 0;
        if (biggest) {
          to_add = 9;
          while (to_add + y_add + x_add > 9) to_add--;
        } else {
          to_add = 1;
          while (to_add + y_add + x_add < 1) to_add++;
        }
        final[y_index] = to_add;
        final[i] = to_add + y_add + x_add;
      }
    }
    return final.join('');
  };

  return [getBound(false), getBound(true)];
};

type Memory = {
  x: number;
  y: number;
  z: number;
  w: number;
};

type Variable = 'w' | 'x' | 'y' | 'z';

const run = (program: string[], input_buffer: string) => {
  const mem: Memory = { w: 0, x: 0, y: 0, z: 0 };

  program.forEach((i) => {
    const a = i[4] as Variable;
    let b = 0;
    if (['w', 'x', 'y', 'z'].indexOf(i[6]) != -1) {
      b = mem[i[6] as Variable];
    } else {
      b = parseInt(i.substr(6));
    }
    switch (i.substr(0, 3)) {
      case 'inp':
        mem[a] = parseInt(input_buffer[0]);
        input_buffer = input_buffer.substr(1);
        break;
      case 'add':
        mem[a] = mem[a] + b;
        break;
      case 'mul':
        mem[a] = mem[a] * b;
        break;
      case 'div':
        mem[a] = Math.floor(mem[a] / b);
        break;
      case 'mod':
        mem[a] = mem[a] % b;
        break;
      case 'eql':
        mem[a] = mem[a] == b ? 1 : 0;
        break;
    }
  });

  return mem['z'] == 0;
};

const day24 = () => {
  const data = readData();
  const bounds = getBounds(data);
  const lower = parseInt(bounds[0], 10);
  const upper = parseInt(bounds[1], 10);
  for (let value = upper; value >= lower; --value) {
    const result = run(data, value.toString());
    if (result) {
      return value;
    }
  }

  return -1;
};

export const day24PartTwo = () => {
  const data = readData();
  const bounds = getBounds(data);
  const lower = parseInt(bounds[0], 10);
  const upper = parseInt(bounds[1], 10);
  for (let value = lower; value <= upper; ++value) {
    const result = run(data, value.toString());
    if (result) {
      return value;
    }
  }

  return -1;
};

export default day24;

console.log('Bounds: ', getBounds(readData()));
